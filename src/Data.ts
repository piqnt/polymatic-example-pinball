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

  constructor(position = { x: 0, y: 0 }, r = 0.4) {
    DEBUG && console.log("Ball", position, r);
    this.position = position;
    this.init = { x: position.x, y: position.y };
    this.radius = r;
  }
}

export class Wall {
  key = "wall-" + Math.random();
  type = "wall" as const;

  vertices: Vec2Value[];

  constructor(points: Vec2Value[]) {
    DEBUG && console.log("Wall", points);
    this.vertices = points;
  }
}

export class Drain {
  key = "drain-" + Math.random();
  type = "drain" as const;

  vertices: Vec2Value[];

  constructor(points: Vec2Value[]) {
    DEBUG && console.log("Drain", points);
    this.vertices = points;
  }
}

export class Flipper {
  key = "flipper-" + Math.random();
  type = "flipper" as const;

  isLeft = true;
  points: Vec2Value[];
  anchor: Vec2Value;

  constructor(anchor: Vec2Value, points: Vec2Value[], isLeft = true) {
    DEBUG && console.log("Flipper", points, isLeft);
    this.anchor = anchor;
    this.points = points;
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

  power = 0;

  fixtures: Vec2Value[][] = [];

  constructor() {
    DEBUG && console.log("Plunger");
  }
}

export class Kicker {
  key = "kicker-" + Math.random();
  type = "kicker" as const;

  points: Vec2Value[];
  anchor: Vec2Value;

  constructor(points: Vec2Value[]) {
    // calculate the middle point of all points
    DEBUG && console.log("Kicker", JSON.stringify(points));
    const midX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const midY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
    this.anchor = { x: midX, y: midY };
    this.points = points.map((p) => ({ x: p.x - midX, y: p.y - midY }));
    DEBUG && console.log("Kicker", JSON.stringify(this.points), this.anchor);
  }
}

export class Slingshot {
  key = "slingshot-" + Math.random();
  type = "slingshot" as const;

  vertices: Vec2Value[];

  constructor(points: Vec2Value[]) {
    DEBUG && console.log("Slingshot", points);
    this.vertices = points;
  }
}

export type TablePart = Wall | Flipper | Bumper | Plunger | Kicker | Slingshot | Drain;
