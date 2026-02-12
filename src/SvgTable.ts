// Copyright (c) Ali Shakiba
// Release under the MIT License

import { Middleware } from "polymatic";
import { Vec2, Vec2Value } from "planck";
import { Factory, svgFactory } from "svg-play";

import { MainContext } from "./Main";
import { Ball, Wall, Flipper, Bumper, Plunger, Kicker, Slingshot, TablePart, Drain } from "./Data";

import svgRaw from "./svg-table/ghost.svg?raw";
import { UNIT_PER_METER } from "./Config";

const DEBUG = false;

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
    this.context.ball = null;

    DEBUG && console.log(svgRaw);

    const svg = await svgFactory(svgRaw, this.factory, {
      meterPerPixelRatio: 1 / UNIT_PER_METER,
      scaleY: -1,
    });

    const viewbox = svg.$.viewBox.split(" ").map(parseFloat);
    const width = viewbox[2] / UNIT_PER_METER;
    const height = viewbox[3] / UNIT_PER_METER;
    this.context.camera.width = width * 1.1;
    this.context.camera.height = height * 1.1;
    this.context.camera.x = width / 2;
    this.context.camera.y = height / 2;

    DEBUG && console.log("SVG loaded", { width, height });
  }

  leftFlipperAnchor: Vec2Value;
  rightFlipperAnchor: Vec2Value;
  leftFlipperBody: Vec2Value[];
  rightFlipperBody: Vec2Value[];

  factory: Factory = {
    circle: (node, center: Vec2Value, radius: number) => {
      logSvgComponent("circle", node, { p: center, radius });

      const type = getLabel(node);

      if (type === "bumper") {
        this.createBumper(center, radius);
      } else if (type === "ball") {
        this.createBall(center, radius);
      } else if (type === "flipper-anchor-left") {
        this.leftFlipperAnchor = center;
        this.createLeftFlipper();
      } else if (type === "flipper-anchor-right") {
        this.rightFlipperAnchor = center;
        this.createRightFlipper();
      }
    },

    edge: (node: any, p1: Vec2Value, p2: Vec2Value) => {
      logSvgComponent("edge", node, { p1, p2 });

      const type = getLabel(node);

      if (type === "slingshot") {
        this.createSlingshot([p1, p2]);
      } else if (type === "drain") {
        this.createDrain([p1, p2]);
      } else {
        this.createWall([p1, p2]);
      }
    },

    chain: (node, vertices: Vec2Value[]) => {
      logSvgComponent("chain", node, { vertices });

      const type = getLabel(node);

      if (type === "flipper-left") {
        this.leftFlipperBody = vertices;
        this.createLeftFlipper();
      } else if (type === "flipper-right") {
        this.rightFlipperBody = vertices;
        this.createRightFlipper();
      } else if (type === "drain") {
        this.createDrain(vertices);
      } else if (type === "plunger") {
        this.createPlunger(vertices);
      } else {
        this.createWall(vertices);
      }
    },

    box: (node, width: number, height: number, center: { x: number; y: number }, angle: number) => {
      logSvgComponent("box", node, { width, height, center });

      const type = getLabel(node);
      const vertices = [
        { x: center.x - width / 2, y: center.y - height / 2 },
        { x: center.x + width / 2, y: center.y - height / 2 },
        { x: center.x + width / 2, y: center.y + height / 2 },
      ];

      if (type === "kicker") {
        this.createKicker(vertices);
      } else if (type === "plunger") {
        this.createPlunger(vertices);
      } else {
        this.createWall(vertices);
      }
    },

    polygon: (node, vertices: Vec2[]): void => {
      logSvgComponent("polygon", node, { vertices });

      const type = getLabel(node);

      if (type === "kicker") {
        this.createKicker(vertices);
      } else if (type === "plunger") {
        this.createPlunger(vertices);
      } else if (type === "flipper-left") {
        this.leftFlipperBody = vertices;
        this.createLeftFlipper();
      } else if (type === "flipper-right") {
        this.rightFlipperBody = vertices;
        this.createRightFlipper();
      } else {
        this.createWall(vertices);
      }
    },
  };

  createBall(vertices: Vec2Value, r: number) {
    const ball = new Ball(vertices, r);
    this.context.ball = ball;
  }

  createWall(vertices: Vec2Value[]) {
    const part = new Wall(vertices);
    this.context.parts.push(part);
  }

  createDrain(vertices: Vec2Value[]) {
    const part = new Drain(vertices);
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

  createSlingshot(vertices: Vec2Value[]) {
    const part = new Slingshot(vertices);
    this.context.parts.push(part);
  }

  createKicker(vertices: Vec2Value[]) {
    const part = new Kicker(vertices);
    this.context.parts.push(part);
  }

  createPlunger(vertices: Vec2Value[]) {
    this.context.plunger = new Plunger(vertices);
  }
}

const logSvgComponent = (shape: string, node: any, data: any) => {
  if (!DEBUG) return;
  const label = getLabel(node);
  console.log("SVG Shape:", shape, label, node, JSON.stringify(data));
};

const getLabel = (node: any): string | undefined => {
  return node.$?.["inkscape:label"] || node.$?.["data-pinball-label"];
};
