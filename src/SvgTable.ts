// Copyright (c) Ali Shakiba
// Release under the MIT License

import { Middleware } from "polymatic";
import { Vec2, Vec2Value } from "planck";
import { Factory, svgFactory } from "svg-play";

import { MainContext } from "./Main";
import { Ball, Wall, Flipper, Bumper, Plunger, Kicker, Slingshot, TablePart, Drain } from "./Data";

import svgRaw from "./svg-table/ghost.svg?raw";
import { UNIT_PER_METER } from "./Config";

/**
 * Middleware to load SVG file and create table parts.
 */
export class SvgTable extends Middleware<MainContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
  }

  async handleActivate() {
    this.context.parts = [];
    this.context.flippers = [];

    // this.context.plunger = new Plunger({ x: 21.25, y: 29 });

    this.context.plungerPressed = false;
    this.context.plungerPower = 0;

    console.log(svgRaw);

    const svg = await svgFactory(svgRaw, this.factory, {
      meterPerPixelRatio: 1 / UNIT_PER_METER,
      scaleY: -1,
    });

    const viewbox = svg.$.viewBox.split(" ").map(parseFloat);
    const width = viewbox[2] / UNIT_PER_METER;
    const height = viewbox[3] / UNIT_PER_METER;
    this.context.camera.width = width;
    this.context.camera.height = height;
    this.context.camera.x = width / 2;
    this.context.camera.y = height / 2;
  }

  leftFlipperAnchor: Vec2Value;
  rightFlipperAnchor: Vec2Value;
  leftFlipperBody: Vec2Value[];
  rightFlipperBody: Vec2Value[];

  factory: Factory = {
    circle: (node, p: Vec2Value, radius: number) => {
      const type = node.$?.["inkscape:label"];
      console.log("Circle:", type, node, p, radius);

      if (type === "bumper") {
        this.createBumper(p, radius);
      } else if (type === "ball") {
        this.createBall(p, radius);
      } else if (type === "flipper-anchor-left") {
        this.leftFlipperAnchor = p;
        this.createLeftFlipper();
      } else if (type === "flipper-anchor-right") {
        this.rightFlipperAnchor = p;
        this.createRightFlipper();
      }
    },
    edge: (node: any, p1: Vec2Value, p2: Vec2Value) => {
      const type = node.$?.["inkscape:label"];
      console.log("Edge:", type, node, p1, p2);

      if (type === "slingshot") {
        this.createSlingshot([p1, p2]);
      } else if (type === "drain") {
        this.createDrain([p1, p2]);
      } else {
        this.createWall([p1, p2]);
      }
    },

    chain: (node, points: Vec2Value[]) => {
      const type = node.$?.["inkscape:label"];
      console.log("Chain:", type, type, node);

      if (type === "flipper-left") {
        this.leftFlipperBody = points;
        this.createLeftFlipper();
      } else if (type === "flipper-right") {
        this.rightFlipperBody = points;
        this.createRightFlipper();
      } else if (type === "flipper-left") {
        this.leftFlipperBody = points;
        this.createLeftFlipper();
      } else if (type === "flipper-right") {
        this.rightFlipperBody = points;
        this.createRightFlipper();
      } else if (type === "drain") {
        this.createDrain(points);
      } else {
        this.createWall(points);
      }
    },

    box: (node, width: number, height: number, center: { x: number; y: number }, angle: number) => {
      const type = node.$?.["inkscape:label"];
      console.log("Box:", type, node);

      if (type === "kicker") {
        this.createKicker([
          { x: center.x - width / 2, y: center.y - height / 2 },
          { x: center.x + width / 2, y: center.y - height / 2 },
          { x: center.x + width / 2, y: center.y + height / 2 },
        ]);
      }
    },
    polygon: (node, points: Vec2[]): void => {
      const type = node.$?.["inkscape:label"];
      console.log("Polygon:", type, node, points);

      if (type === "kicker") {
        this.createKicker(points);
      } else if (type === "flipper-left") {
        this.leftFlipperBody = points;
        this.createLeftFlipper();
      } else if (type === "flipper-right") {
        this.rightFlipperBody = points;
        this.createRightFlipper();
      }
    },
  };

  createBall(points: Vec2Value, r: number) {
    const ball = new Ball(points, r);
    this.context.ball = ball;
  }

  createWall(points: Vec2Value[]) {
    const part = new Wall(points);
    this.context.parts.push(part);
  }

  createDrain(points: Vec2Value[]) {
    const part = new Drain(points);
    this.context.parts.push(part);
  }

  createLeftFlipper() {
    if (this.leftFlipperAnchor && this.leftFlipperBody) {
      const part = new Flipper(this.leftFlipperAnchor, this.leftFlipperBody, true);
      this.context.flippers.push(part);
    }
  }

  createRightFlipper() {
    if (this.rightFlipperAnchor && this.rightFlipperBody) {
      const part = new Flipper(this.rightFlipperAnchor, this.rightFlipperBody, false);
      this.context.flippers.push(part);
    }
  }
  createBumper(center: Vec2Value, radius: number) {
    const part = new Bumper(center, radius);
    this.context.parts.push(part);
  }

  createSlingshot(points: Vec2Value[]) {
    const part = new Slingshot(points);
    this.context.parts.push(part);
  }

  createKicker(points: Vec2Value[]) {
    const part = new Kicker(points);
    this.context.parts.push(part);
  }
}
