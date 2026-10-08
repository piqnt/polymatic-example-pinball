/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import svgpath from "svgpath";

export interface Point {
  x: number;
  y: number;
}

/**
 * A shape found in an svg, with every transform applied, and the element it
 * came from, to read its id and attributes off.
 *
 * - `circle`: a circle, or an ellipse as the circle of the same area.
 * - `polygon`: a closed outline - a rect, a polygon, or a closed path.
 * - `chain`: an open line of two or more points - a line, a polyline, or an open path.
 */
export type SvgShape =
  | { type: "circle"; element: Element; center: Point; radius: number }
  | { type: "polygon"; element: Element; points: Point[] }
  | { type: "chain"; element: Element; points: Point[] };

/** straight pieces each bezier is flattened into (an arc is one bezier per quarter turn) */
const CURVE_SEGMENTS = 8;

/** elements never drawn as they are, so not shapes: their contents are only ever referenced */
const HIDDEN = new Set([
  "defs",
  "mask",
  "pattern",
  "clipPath",
  "symbol",
  "marker",
  "linearGradient",
  "radialGradient",
  "filter",
]);

/**
 * Reads the shapes of an svg element, with the browser's own parser and
 * transforms, then `transform` (to change units, or flip y). The svg needn't
 * be in the page.
 */
export function readSvgShapes(root: Element, transform: DOMMatrix): SvgShape[] {
  const shapes: SvgShape[] = [];
  const walk = (element: Element, outer: DOMMatrix) => {
    if (HIDDEN.has(element.localName)) return;
    const matrix = element === root ? outer : outer.multiply(ownTransform(element));
    const shape = readShape(element, matrix);
    if (shape) shapes.push(...shape);
    for (const child of Array.from(element.children)) walk(child, matrix);
  };
  walk(root, transform);
  return shapes;
}

function ownTransform(element: Element): DOMMatrix {
  const list = (element as SVGGraphicsElement).transform?.baseVal;
  const consolidated = list && list.numberOfItems > 0 ? list.consolidate() : null;
  return consolidated ? DOMMatrix.fromMatrix(consolidated.matrix) : new DOMMatrix();
}

/**
 * The browser has already parsed each element: its lengths are numbers on
 * `baseVal`, a polygon's points a list, a transform a matrix. Only a path's
 * data is left as text, for svgpath.
 */
function readShape(element: Element, m: DOMMatrix): SvgShape[] | null {
  const at = (x: number, y: number) => {
    const p = m.transformPoint(new DOMPoint(x, y));
    return { x: p.x, y: p.y };
  };
  const len = (length: SVGAnimatedLength) => length.baseVal.value;
  // how much the transform scales lengths, on average
  const scale = Math.sqrt(Math.abs(m.a * m.d - m.b * m.c));

  if (element instanceof SVGCircleElement) {
    return [{ type: "circle", element, center: at(len(element.cx), len(element.cy)), radius: len(element.r) * scale }];
  }
  if (element instanceof SVGEllipseElement) {
    const radius = Math.sqrt(len(element.rx) * len(element.ry)) * scale;
    return [{ type: "circle", element, center: at(len(element.cx), len(element.cy)), radius }];
  }
  if (element instanceof SVGRectElement) {
    const x = len(element.x);
    const y = len(element.y);
    const w = len(element.width);
    const h = len(element.height);
    return [{ type: "polygon", element, points: [at(x, y), at(x + w, y), at(x + w, y + h), at(x, y + h)] }];
  }
  if (element instanceof SVGLineElement) {
    const points = [at(len(element.x1), len(element.y1)), at(len(element.x2), len(element.y2))];
    return [{ type: "chain", element, points }];
  }
  if (element instanceof SVGPolylineElement || element instanceof SVGPolygonElement) {
    const list = element.points;
    const points: Point[] = [];
    for (let i = 0; i < list.numberOfItems; i++) points.push(at(list.getItem(i).x, list.getItem(i).y));
    return [outline(element, points, element instanceof SVGPolygonElement)].filter(Boolean);
  }
  if (element instanceof SVGPathElement) {
    return flattenPath(element.getAttribute("d") ?? "")
      .map(({ points, closed }) =>
        outline(
          element,
          points.map((p) => at(p.x, p.y)),
          closed,
        ),
      )
      .filter(Boolean);
  }
  return null;
}

/** a polygon or a chain, without repeated points; a line that ends where it starts is closed */
function outline(element: Element, points: Point[], closed: boolean): SvgShape | null {
  const same = (a: Point, b: Point) => Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y - b.y) < 1e-9;
  points = points.filter((p, i) => i === 0 || !same(p, points[i - 1]));
  if (points.length > 2 && same(points[0], points[points.length - 1])) {
    points.pop();
    closed = true;
  }
  if (points.length < 2) return null;
  return closed && points.length > 2 ? { type: "polygon", element, points } : { type: "chain", element, points };
}

/**
 * Path data as lines: each subpath its points, curves flattened. svgpath
 * parses it, makes it absolute, and turns smooth curves and arcs into plain
 * beziers, so only M, L, H, V, C, Q and Z are left to follow.
 */
function flattenPath(d: string): { points: Point[]; closed: boolean }[] {
  const paths: { points: Point[]; closed: boolean }[] = [];
  let points: Point[] = [];
  let start: Point = { x: 0, y: 0 };

  const end = (closed: boolean) => {
    if (points.length > 1) paths.push({ points, closed });
    points = [];
  };
  const cubic = (x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
    for (let k = 1; k <= CURVE_SEGMENTS; k++) {
      const t = k / CURVE_SEGMENTS;
      const u = 1 - t;
      points.push({
        x: u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
        y: u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
      });
    }
  };

  svgpath(d)
    .abs()
    .unshort()
    .unarc()
    .iterate((s, _, x, y) => {
      switch (s[0]) {
        case "M":
          end(false);
          start = { x: s[1], y: s[2] };
          points.push(start);
          break;
        case "L":
          points.push({ x: s[1], y: s[2] });
          break;
        case "H":
          points.push({ x: s[1], y });
          break;
        case "V":
          points.push({ x, y: s[1] });
          break;
        case "C":
          cubic(x, y, s[1], s[2], s[3], s[4], s[5], s[6]);
          break;
        case "Q":
          // a quadratic, as the cubic it equals
          cubic(
            x,
            y,
            x + (2 / 3) * (s[1] - x),
            y + (2 / 3) * (s[2] - y),
            s[3] + (2 / 3) * (s[1] - s[3]),
            s[4] + (2 / 3) * (s[2] - s[4]),
            s[3],
            s[4],
          );
          break;
        case "Z":
        case "z":
          end(true);
          // drawing on after a close starts from where the subpath started
          points = [start];
          break;
      }
    });
  end(false);
  return paths;
}
