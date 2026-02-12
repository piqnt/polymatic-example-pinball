// Copyright (c) Ali Shakiba
// Release under the MIT License

import { Vec2Value } from "planck";

const DEBUG = false;

export class Ball {
  key = "ball-" + Math.random();
  type = "ball" as const;

  position: Vec2Value;
  radius: number;
  init: Vec2Value;

  constructor(position: Vec2Value, r: number) {
    DEBUG && console.log("Ball", position, r);
    this.position = position;
    this.init = { x: position.x, y: position.y };
    this.radius = r;
  }
}

export class Wall {
  key = "wall-" + Math.random();
  type = "wall" as const;

  position: Vec2Value;
  vertices: Vec2Value[];

  constructor(vertices: Vec2Value[]) {
    DEBUG && console.log("Wall", vertices);
    const meta = metaVertices(vertices);
    this.position = meta.center;
    this.vertices = unshiftVertices(vertices, meta.center);
  }
}

export class Drain {
  key = "drain-" + Math.random();
  type = "drain" as const;

  position: Vec2Value;
  vertices: Vec2Value[];

  constructor(vertices: Vec2Value[]) {
    DEBUG && console.log("Drain", vertices);
    const meta = metaVertices(vertices);
    this.position = meta.center;
    this.vertices = unshiftVertices(vertices, meta.center);
  }
}

export class Flipper {
  key = "flipper-" + Math.random();
  type = "flipper" as const;

  isLeft = true;
  position: Vec2Value;
  vertices: Vec2Value[];
  // joint anchor point
  anchor: Vec2Value;

  constructor(anchor: Vec2Value, vertices: Vec2Value[], isLeft = true) {
    DEBUG && console.log("Flipper", vertices, isLeft);
    this.anchor = anchor;
    const meta = metaVertices(vertices);
    this.position = meta.center;
    this.vertices = unshiftVertices(vertices, meta.center);
    this.isLeft = isLeft;
  }
}

export class Bumper {
  key = "bumper-" + Math.random();
  type = "bumper" as const;

  position: Vec2Value;
  radius = 1;

  constructor(position: Vec2Value, r: number = 1) {
    DEBUG && console.log("Bumper", position, r);
    this.position = position;
    this.radius = r;
  }
}

export class Plunger {
  key = "plunger-" + Math.random();
  type = "plunger" as const;

  press = 0;

  position: Vec2Value;
  vertices: Vec2Value[];

  constructor(vertices: Vec2Value[]) {
    DEBUG && console.log("Plunger", vertices);
    const meta = metaVertices(vertices);
    this.position = meta.center;
    this.vertices = unshiftVertices(vertices, meta.center);
  }
}

export class Kicker {
  key = "kicker-" + Math.random();
  type = "kicker" as const;

  position: Vec2Value;
  vertices: Vec2Value[];

  constructor(vertices: Vec2Value[]) {
    DEBUG && console.log("Kicker", vertices);
    const meta = metaVertices(vertices);
    this.position = meta.center;
    this.vertices = unshiftVertices(vertices, meta.center);
  }
}

export class Slingshot {
  key = "slingshot-" + Math.random();
  type = "slingshot" as const;

  position: Vec2Value;
  vertices: Vec2Value[];

  constructor(vertices: Vec2Value[]) {
    DEBUG && console.log("Slingshot", vertices);
    const meta = metaVertices(vertices);
    this.position = meta.center;
    this.vertices = unshiftVertices(vertices, meta.center);
  }
}

export type TablePart = Wall | Flipper | Bumper | Plunger | Kicker | Slingshot | Drain;

export const metaVertices = (vertices: Vec2Value[]) => {
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  for (const v of vertices) {
    if (v.x < xMin) xMin = v.x;
    if (v.x > xMax) xMax = v.x;
    if (v.y < yMin) yMin = v.y;
    if (v.y > yMax) yMax = v.y;
  }
  return {
    min: { x: xMin, y: yMin },
    max: { x: xMax, y: yMax },
    center: { x: (xMin + xMax) / 2, y: (yMin + yMax) / 2 },
  };
};

export const unshiftVertices = (vertices: Vec2Value[], offset: Vec2Value): Vec2Value[] => {
  return vertices.map((v) => ({ x: v.x - offset.x, y: v.y - offset.y }));
};

export const shiftVertices = (vertices: Vec2Value[], offset: Vec2Value): Vec2Value[] => {
  return vertices.map((v) => ({ x: v.x + offset.x, y: v.y + offset.y }));
};
