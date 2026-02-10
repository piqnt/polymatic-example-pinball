// Copyright (c) Ali Shakiba
// Release under the MIT License

interface Point {
  x: number;
  y: number;
}

export class Ball {
  key = "ball-" + Math.random();
  type = "ball" as const;

  position: Point;
  radius: number;
  init: Point;

  constructor(position = { x: 0, y: 0 }, r = 0.4) {
    console.log("Ball", position, r);
    this.position = position;
    this.init = { x: position.x, y: position.y };
    this.radius = r;
  }
}

export class Wall {
  key = "wall-" + Math.random();
  type = "wall" as const;

  points: Point[];

  constructor(points: Point[]) {
    console.log("Wall", points);
    this.points = points;
  }
}

export class Drain {
  key = "drain-" + Math.random();
  type = "drain" as const;

  points: Point[];

  constructor(points: Point[]) {
    console.log("Drain", points);
    this.points = points;
  }
}

export class Flipper {
  key = "flipper-" + Math.random();
  type = "flipper" as const;

  isLeft = true;
  points: Point[];
  anchor: Point;

  constructor(anchor: Point, points: Point[], isLeft = true) {
    console.log("Flipper", points, isLeft);
    this.anchor = anchor;
    this.points = points;
    this.isLeft = isLeft;
  }
}

export class Bumper {
  key = "bumper-" + Math.random();
  type = "bumper" as const;

  position: Point;
  radius = 1;

  constructor(position: Point, r: number = 1) {
    console.log("Bumper", position, r);
    this.position = position;
    this.radius = r;
  }
}

export class Plunger {
  key = "plunger-" + Math.random();
  type = "plunger" as const;

  power = 0; // 0 to 1
  points: Point[];

  constructor(points: Point[]) {
    console.log("Plunger", points);
    this.points = points;
  }
}

export class Kicker {
  key = "kicker-" + Math.random();
  type = "kicker" as const;

  points: Point[];
  anchor: Point;

  constructor(points: Point[]) {
    // calculate the middle point of all points
    console.log("Kicker", JSON.stringify(points));
    const midX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const midY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
    this.anchor = { x: midX, y: midY };
    this.points = points.map((p) => ({ x: p.x - midX, y: p.y - midY }));
    console.log("Kicker", JSON.stringify(this.points), this.anchor);
  }
}

export class Slingshot {
  key = "slingshot-" + Math.random();
  type = "slingshot" as const;

  points: Point[];

  constructor(points: Point[]) {
    console.log("Slingshot", points);
    this.points = points;
  }
}

export type TablePart = Wall | Flipper | Bumper | Plunger | Kicker | Slingshot | Drain;
