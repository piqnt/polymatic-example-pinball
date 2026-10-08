/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from "polymatic";
import { Vec2Value } from "planck";

import {
  type MainContext,
  type AnyPart,
  type PartType,
  Ball,
  PART_CLASSES,
  SVG_TO_WORLD,
  getTable,
  isPartType,
  labelOf,
  parseDrawing,
} from "../model";
import { SelectTable, TableLoaded } from "../events";
import { readSvgShapes, type SvgShape } from "./readSvgShapes";

const DEBUG = false;

/**
 * Loads the table being played, when activated and whenever another is
 * picked: reads its parts from its svg. Each shape's label says what part it is; a shape with no
 * part's label is only drawn.
 */
export class TableLoader extends Middleware<MainContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on(SelectTable, this.handleSelectTable);
  }

  handleActivate = () => {
    this.load(this.context.table);
  };

  handleSelectTable = (id: string) => {
    // so a link or a reload opens the same table
    history.replaceState(null, "", "#" + id);
    this.load(id);
  };

  load(id: string) {
    const drawing = parseDrawing(getTable(id).svg);
    const shapes = readSvgShapes(drawing, SVG_TO_WORLD);
    const reader = new TableReader();
    for (const shape of shapes) reader.read(shape);
    reader.pairFlippers();

    // the old table's parts and balls go, and their bodies with them
    this.context.table = id;
    this.context.balls = [];
    this.context.parts = reader.parts;
    this.context.ballTemplate = reader.ball;
    this.context.drawing = drawing;
    DEBUG && console.log("table", id, reader.parts);
    this.emit(TableLoaded);
  }
}

/** Turns shapes into parts, by their labels. */
class TableReader {
  parts: AnyPart[] = [];
  ball: Ball = null;
  anchors: { center: Vec2Value; isLeft: boolean }[] = [];

  read(shape: SvgShape) {
    const element = shape.element;
    const label = labelOf(element);
    if (shape.type === "circle") {
      if (label === "ball") {
        this.ball = new Ball(shape.center, shape.radius, element.id);
      } else if (label === "flipper-anchor-left" || label === "flipper-anchor-right") {
        this.anchors.push({ center: shape.center, isLeft: label === "flipper-anchor-left" });
      } else if (takes(label, "circle")) {
        this.part(element, label, shape.center).radius = shape.radius;
      }
      return;
    }

    let type: PartType;
    if (label === "flipper-left" || label === "flipper-right") type = "flipper";
    else if (takes(label, "outline")) type = label;
    else return;
    const center = centerOf(shape.points);
    const part = this.part(element, type, center);
    part.vertices = shape.points.map((p) => ({ x: p.x - center.x, y: p.y - center.y }));
    part.closed = shape.type === "polygon";
    if (part.type === "flipper") part.isLeft = label === "flipper-left";
  }

  part(element: Element, type: PartType, center: Vec2Value) {
    const part = new PART_CLASSES[type](element.id, center);
    const data = (name: string) => element.getAttribute("data-" + name);
    if (data("group") != null) part.group = data("group");
    if (data("points") != null) part.points = Number(data("points"));
    if (data("locks") != null && part.type === "lock") part.locks = Number(data("locks"));
    if (data("direction") != null) part.direction = direction(data("direction"));
    this.parts.push(part);
    return part;
  }

  /** each flipper turns about the anchor of its side nearest to it */
  pairFlippers() {
    for (const flipper of this.parts.filter((part) => part.type === "flipper")) {
      let best = null;
      let bestDistance = Infinity;
      for (const anchor of this.anchors) {
        if (anchor.isLeft !== flipper.isLeft) continue;
        const d = Math.hypot(anchor.center.x - flipper.position.x, anchor.center.y - flipper.position.y);
        if (d < bestDistance) {
          bestDistance = d;
          best = anchor;
        }
      }
      if (best) flipper.anchor = best.center;
      else console.warn("A flipper has no anchor on its side", flipper.elementId);
    }
    this.parts = this.parts.filter((part) => part.type !== "flipper" || part.anchor);
  }
}

/** whether a label names a part type that can be drawn as this shape */
const takes = (label: string | null, shape: "circle" | "outline"): label is PartType => {
  if (!isPartType(label)) return false;
  const shapes = PART_CLASSES[label].shapes;
  return shapes === shape || shapes === "any";
};

const WORDS: Record<string, number> = { up: 0, right: 90, down: 180, left: 270 };

/** data-direction - degrees clockwise from up, or up, right, down or left - as a world direction */
const direction = (value: string) => {
  const degrees = WORDS[value] ?? Number(value);
  const a = (degrees * Math.PI) / 180;
  // on the drawing y is down, in the world it is up
  return { x: Math.sin(a), y: Math.cos(a) };
};

/** the centre of the points' bounding box */
const centerOf = (points: Vec2Value[]): Vec2Value => {
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  for (const p of points) {
    if (p.x < xMin) xMin = p.x;
    if (p.x > xMax) xMax = p.x;
    if (p.y < yMin) yMin = p.y;
    if (p.y > yMax) yMax = p.y;
  }
  return { x: (xMin + xMax) / 2, y: (yMin + yMax) / 2 };
};
