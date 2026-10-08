/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Binder, Driver, Middleware } from "polymatic";

import {
  type MainContext,
  type MovingPart,
  Ball,
  type AnyPart,
  Hold,
  Part,
  Spinner,
  isPart,
  SVG_TO_WORLD,
  labelOf,
} from "../model";
import { FrameRender, TableLoaded } from "../events";

const WORLD_TO_SVG = SVG_TO_WORLD.inverse();

/** how long a hit part shows the "hit" class */
const FLASH = 0.15;

interface Placed {
  element: SVGGraphicsElement;
  /** from the element's parent's coordinates to the svg's */
  parent: DOMMatrix;
  parentInverse: DOMMatrix;
  /** the element's own transform, as drawn */
  own: DOMMatrix;
}

/**
 * Shows the table svg as drawn, and brings it to life:
 *
 * - Moving parts' elements follow them: the motion from `origin` to
 *   `position` and `angle` is carried from physics coordinates into the
 *   element's own, before its own transform.
 * - Each ball in play is a copy of the drawn ball, which is hidden. A ball on a
 *   ramp is drawn over everything; on the playfield, where the drawn ball is.
 * - A spinner is squashed across its axis as it turns.
 * - Part state shows as classes - lit, down, active, full, hit - and named
 *   lights as "lit" on elements with data-light. The table's styles draw them.
 *
 * Art with data-part="<a part's id>" moves and lights up with that part.
 */
export class TableView extends Middleware<MainContext> {
  container: HTMLElement;
  svg: SVGSVGElement;
  /** the drawn ball, hidden; copies of it go after it */
  drawnBall: SVGGraphicsElement | null = null;
  lightElements: Element[] = [];

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
    this.on(TableLoaded, this.handleTableLoaded);
    this.on(FrameRender, this.handleFrameRender);
  }

  handleActivate = () => {
    this.container = document.getElementById("table") ?? document.body;
    // the loader, activated first, has read the table already
    this.show(this.context.drawing);
  };

  handleTableLoaded = () => {
    this.show(this.context.drawing);
  };

  handleDeactivate = () => {
    this.binder.setData([]);
    this.svg?.remove();
    this.svg = null;
  };

  /** put the loader's drawing in the page */
  show(drawing: SVGSVGElement | null) {
    if (!drawing || drawing === this.svg) return;
    // the parts' elements are the old drawing's; let go of them before it goes
    this.binder.setData([]);
    this.svg?.remove();
    this.svg = drawing;
    // sized by the page (index.html), not the drawing
    this.svg.removeAttribute("width");
    this.svg.removeAttribute("height");
    this.container.appendChild(this.svg);
    // the table's frame takes the drawing's proportions
    const box = this.svg.viewBox.baseVal;
    if (box?.width && box.height) this.container.style.setProperty("--table-aspect", String(box.width / box.height));
    this.drawnBall = null;
    this.lightElements = Array.from(this.svg.querySelectorAll("[data-light]"));
    // the flippers' pivots are not parts, but the Engineer's Plate draws them
    for (const element of Array.from(this.svg.querySelectorAll("*"))) {
      const label = labelOf(element);
      if (label === "flipper-anchor-left" || label === "flipper-anchor-right") element.setAttribute("data-role", "pivot");
    }
  }

  handleFrameRender = () => {
    if (!this.svg) return;
    const ctx = this.context;
    const template = ctx.ballTemplate;
    if (template && !this.drawnBall) {
      this.drawnBall = this.svg.getElementById(template.elementId) as SVGGraphicsElement;
      this.drawnBall?.setAttribute("visibility", "hidden");
    }
    this.binder.setData([...ctx.parts, ...ctx.balls]);
    for (const element of this.lightElements) {
      element.classList.toggle("lit", ctx.lights.has(element.getAttribute("data-light")));
    }
  };

  /** the part's own element, and any art attached to it */
  elementsOf(part: Part): SVGGraphicsElement[] {
    const own = this.svg.getElementById(part.elementId) as SVGGraphicsElement | null;
    const attached = this.svg.querySelectorAll<SVGGraphicsElement>(`[data-part="${CSS.escape(part.elementId)}"]`);
    return [...(own ? [own] : []), ...attached];
  }

  place(element: SVGGraphicsElement): Placed {
    const parent = parentMatrix(element, this.svg);
    return { element, parent, parentInverse: parent.inverse(), own: ownMatrix(element) };
  }

  /** put the element where the motion `moved` (in physics coordinates) takes it from where it is drawn */
  move({ element, parent, parentInverse, own }: Placed, moved: DOMMatrix) {
    const m = parentInverse
      .multiply(WORLD_TO_SVG)
      .multiply(moved)
      .multiply(SVG_TO_WORLD)
      .multiply(parent)
      .multiply(own);
    element.setAttribute("transform", `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`);
  }

  rigid(part: MovingPart) {
    return new DOMMatrix()
      .translate(part.position.x, part.position.y)
      .rotate((part.angle * 180) / Math.PI)
      .translate(-part.origin.x, -part.origin.y);
  }

  ballDriver = Driver.create<Ball, Placed & { layer: string }>({
    filter: (data) => data instanceof Ball,
    enter: () => {
      const drawn = this.drawnBall;
      if (!drawn) return null;
      const element = drawn.cloneNode(true) as SVGGraphicsElement;
      element.removeAttribute("id");
      element.removeAttribute("visibility");
      element.setAttribute("data-role", "ball");
      drawn.after(element);
      return { ...this.place(element), layer: "ground" };
    },
    update: (ball, placed) => {
      if (placed.layer !== ball.layer) {
        placed.layer = ball.layer;
        // over the ramps while on one, under them on the playfield
        if (ball.layer === "ramp") this.drawnBall.parentElement.append(placed.element);
        else this.drawnBall.after(placed.element);
      }
      let moved = this.rigid(ball);
      // a ball up on a ramp is nearer, so a little bigger
      if (ball.layer === "ramp") {
        moved = moved.translate(ball.origin.x, ball.origin.y).scale(1.18).translate(-ball.origin.x, -ball.origin.y);
      }
      this.move(placed, moved);
    },
    exit: (ball, { element }) => element.remove(),
  });

  movingDriver = Driver.create<AnyPart, Placed[]>({
    filter: (data) => isPart(data) && data.view === "moves",
    enter: (part) => this.elementsOf(part).map((element) => this.place(element)),
    update: (part, placed) => {
      const moved = this.rigid(part);
      for (const p of placed) {
        this.move(p, moved);
        this.showState(part, p.element);
      }
    },
    exit: () => {},
  });

  spinnerDriver = Driver.create<Spinner, { placed: Placed[]; axis: number }>({
    filter: (data) => data instanceof Spinner,
    enter: (part) => {
      // the flap turns about its first edge: a line, or the long side of a rect
      const v = part.vertices;
      const axis = v ? Math.atan2(v[1].y - v[0].y, v[1].x - v[0].x) : 0;
      return { placed: this.elementsOf(part).map((element) => this.place(element)), axis };
    },
    update: (part, { placed, axis }) => {
      // seen from above, a flap turning about its axis is squashed across it
      const deg = (axis * 180) / Math.PI;
      const squash = Math.max(0.08, Math.abs(Math.cos(part.spin * Math.PI)));
      const moved = new DOMMatrix()
        .translate(part.position.x, part.position.y)
        .rotate(deg)
        .scale(1, squash)
        .rotate(-deg)
        .translate(-part.position.x, -part.position.y);
      for (const p of placed) this.move(p, moved);
    },
    exit: () => {},
  });

  stateDriver = Driver.create<AnyPart, Element[]>({
    filter: (data) => isPart(data) && data.view === "state",
    enter: (part) => this.elementsOf(part),
    update: (part, elements) => {
      for (const element of elements) this.showState(part, element);
    },
    exit: () => {},
  });

  /** each part's element marked with its type, for the Engineer's Plate */
  roleDriver = Driver.create<AnyPart, Element | null>({
    filter: isPart,
    enter: (part) => {
      const element = this.svg.getElementById(part.elementId);
      element?.setAttribute("data-role", part.type);
      return element;
    },
    update: () => {},
    exit: (part, element) => element?.removeAttribute("data-role"),
  });

  /** each part's type, id and settings, as a tooltip */
  nameDriver = Driver.create<AnyPart, SVGTitleElement[]>({
    filter: isPart,
    enter: (part) =>
      this.elementsOf(part).map((element) => {
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = [
          `${part.type}: ${part.elementId}`,
          part.group != null && `group: ${part.group}`,
          part.points > 0 && `points: ${part.points}`,
          part.type === "lock" && part.locks != null && `locks: ${part.locks}`,
        ]
          .filter(Boolean)
          .join("\n");
        element.prepend(title);
        return title;
      }),
    update: () => {},
    exit: (part, titles) => {
      for (const title of titles) title.remove();
    },
  });

  showState(part: Part, element: Element) {
    const list = element.classList;
    list.toggle("lit", part.lit);
    list.toggle("down", part.down);
    list.toggle("active", part.active);
    list.toggle("full", part instanceof Hold && part.full);
    list.toggle("hit", this.context.time - part.hitAt < FLASH);
  }

  binder = Binder.create<AnyPart | Ball>({
    key: (data) => data.key,
    drivers: [
      this.ballDriver,
      this.movingDriver,
      this.spinnerDriver,
      this.stateDriver,
      this.nameDriver,
      this.roleDriver,
    ],
  });
}

/** the element's own transform attribute, as a matrix */
function ownMatrix(element: SVGGraphicsElement) {
  const own = element.transform.baseVal.consolidate();
  return own ? DOMMatrix.fromMatrix(own.matrix) : new DOMMatrix();
}

/** the transforms of the element's ancestors, below the svg root, as one matrix */
function parentMatrix(element: SVGGraphicsElement, root: SVGSVGElement) {
  let m = new DOMMatrix();
  for (let node = element.parentElement; node && node !== (root as Element); node = node.parentElement) {
    if (node instanceof SVGGraphicsElement) m = ownMatrix(node).multiply(m);
  }
  return m;
}
