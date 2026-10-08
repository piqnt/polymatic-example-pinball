/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Vec2Value } from "planck";

/** the shapes the loader takes a part from: a circle, an outline (path, rect, polygon or line), or either */
type Shapes = "circle" | "outline" | "any" | null;

/**
 * A part of the table, in physics coordinates: metres, y up. Its shape is a
 * circle (`radius`) or `vertices`, both around `position`.
 *
 * Each part type is a subclass, which sets what that type is - its shape, its
 * body, how it scores and shows - where it differs from the defaults here.
 * What parts do is in the middlewares: Physics, Rules and TableView.
 */
export abstract class Part {
  static readonly shapes: Shapes = "outline";

  key = "part-" + Math.random();
  /** narrowed by each subclass: see AnyPart */
  abstract readonly type: string;
  elementId: string;

  /** a static body, a body physics makes its own way, or none (physics acts on the balls over it) */
  readonly body: "static" | "own" | "none" = "static";
  /** the ball passes over it rather than hitting it */
  readonly sensor: boolean = false;
  /** a polygon or edges rather than a chain; sensors always are */
  readonly solid: boolean = false;
  /** collides with balls on the playfield, on the ramps, or both */
  readonly layer: "ground" | "ramp" | "both" = "ground";
  readonly restitution: number = 0.3;
  readonly friction: number = 0.2;
  /** touching it is a hit, which the rules score */
  readonly scores: boolean = false;
  /** TableView moves its elements with it, or shows its state on them as classes */
  readonly view: "moves" | "state" | null = null;

  /** where it is drawn, and where it is now */
  origin: Vec2Value;
  position: Vec2Value;
  angle = 0;

  radius?: number;
  vertices?: Vec2Value[];
  /** a polygon or closed chain, not an open one */
  closed = false;

  /** what a hit scores; data-points in the drawing overrides it */
  points = 0;
  /** from the drawing's data- attributes */
  group?: string;
  /** the way a gate or ramp entrance lets the ball through, or a saucer or lock kicks it out */
  direction?: Vec2Value;

  // state, for the rules and the view
  lit = false;
  down = false;
  active = false;
  /** game time of the last hit, for a flash */
  hitAt = -Infinity;

  constructor(elementId: string, center: Vec2Value) {
    this.elementId = elementId;
    this.origin = { x: center.x, y: center.y };
    this.position = { x: center.x, y: center.y };
  }
}

export class Wall extends Part {
  readonly type = "wall";
}

/** A rubber post. */
export class Post extends Part {
  static readonly shapes = "circle";
  readonly type = "post";
  readonly restitution = 0.75;
}

/** A ball that touches it is lost. */
export class Drain extends Part {
  readonly type = "drain";
}

/** A pop bumper: kicks the ball away from its centre. */
export class Bumper extends Part {
  static readonly shapes = "circle";
  readonly type = "bumper";
  readonly restitution = 0;
  readonly scores = true;
  readonly view = "state";
  points = 100;
}

/** Adds a kick to the ball's own bounce. */
export class Slingshot extends Part {
  readonly type = "slingshot";
  readonly scores = true;
  readonly view = "state";
  points = 10;
}

/** Kicks the ball straight back off its face. */
export class Kicker extends Part {
  readonly type = "kicker";
  readonly solid = true;
  readonly scores = true;
  readonly view = "state";
  points = 50;
}

/** Turns about the nearest anchor on its side. Labelled flipper-left or flipper-right. */
export class Flipper extends Part {
  static readonly shapes = null;
  readonly type = "flipper";
  readonly body = "own";
  readonly view = "moves";
  isLeft = true;
  anchor?: Vec2Value;
}

export class Plunger extends Part {
  readonly type = "plunger";
  readonly body = "own";
  readonly view = "moves";
  /** how far it is pulled; below zero, how fast it is springing back */
  press = 0;
}

/** A lane light the ball rolls over. */
export class Rollover extends Part {
  static readonly shapes = "any";
  readonly type = "rollover";
  readonly sensor = true;
  readonly scores = true;
  readonly view = "state";
  points = 50;
}

/** A standup target. */
export class Target extends Part {
  static readonly shapes = "any";
  readonly type = "target";
  readonly solid = true;
  readonly scores = true;
  readonly view = "state";
  points = 200;
}

/** A target that drops when hit, until its bank is down. */
export class DropTarget extends Part {
  readonly type = "drop-target";
  readonly solid = true;
  readonly scores = true;
  readonly view = "state";
  points = 250;
}

/** A flap that spins as the ball goes through; TableView turns it itself. */
export class Spinner extends Part {
  readonly type = "spinner";
  readonly sensor = true;
  points = 25;
  /** half turns so far, and half turns per second */
  spin = 0;
  spinSpeed = 0;
}

/** Lets the ball through one way only. */
export class Gate extends Part {
  readonly type = "gate";
}

/** A saucer or lock: it holds a ball, and kicks it out its `direction`. */
export abstract class Hold extends Part {
  static readonly shapes = "circle";
  abstract readonly type: "saucer" | "lock";
  readonly sensor = true;
  readonly view = "state";
  /** holding a ball */
  full = false;
}

/** Holds the ball a moment. */
export class Saucer extends Hold {
  readonly type = "saucer";
  points = 750;
}

/** Keeps the ball; enough locked balls start multiball. */
export class Lock extends Hold {
  readonly type = "lock";
  points = 1000;
  /** balls it holds before multiball, from data-locks */
  locks?: number;
}

/** Pulls the ball in, on and off. */
export class Magnet extends Part {
  static readonly shapes = "circle";
  readonly type = "magnet";
  readonly body = "none";
  readonly view = "state";
}

/** A spinning disc that carries the ball round. */
export class Disc extends Part {
  static readonly shapes = "circle";
  readonly type = "disc";
  readonly body = "none";
  readonly view = "moves";
}

/** A wall on the ramps; slick, so a ball runs along it without slowing. */
export class RampWall extends Part {
  readonly type = "ramp-wall";
  readonly layer = "ramp";
  readonly restitution = 0.1;
  readonly friction = 0;
}

/** A ramp's entrance: a ball crossing it the right way goes up onto the ramp. */
export class RampEnter extends Part {
  readonly type = "ramp-enter";
  readonly sensor = true;
  readonly layer = "both";
}

/** A ramp's end: puts the ball back down on the playfield. */
export class RampExit extends Part {
  readonly type = "ramp-exit";
  readonly sensor = true;
  readonly layer = "ramp";
  readonly restitution = 0.1;
  readonly friction = 0;
  readonly view = "state";
  points = 1500;
}

/** A ball kept in a channel, to knock into a target. */
export class CaptiveBall extends Part {
  static readonly shapes = "circle";
  readonly type = "captive-ball";
  readonly body = "own";
  readonly view = "moves";
}

/** Any part: `switch (part.type)` narrows it to its class. */
export type AnyPart =
  | Wall
  | Post
  | Drain
  | Bumper
  | Slingshot
  | Kicker
  | Flipper
  | Plunger
  | Rollover
  | Target
  | DropTarget
  | Spinner
  | Gate
  | Saucer
  | Lock
  | Magnet
  | Disc
  | RampWall
  | RampEnter
  | RampExit
  | CaptiveBall;

/** What a shape in the table's svg is, by its label (inkscape:label or data-pinball-label). */
export type PartType = AnyPart["type"];

export const isPart = (data: unknown): data is AnyPart => data instanceof Part;

/** The class for each part type, for the loader. */
export const PART_CLASSES: Record<PartType, { new (elementId: string, center: Vec2Value): AnyPart; shapes: Shapes }> = {
  wall: Wall,
  post: Post,
  drain: Drain,
  bumper: Bumper,
  slingshot: Slingshot,
  kicker: Kicker,
  flipper: Flipper,
  plunger: Plunger,
  rollover: Rollover,
  target: Target,
  "drop-target": DropTarget,
  spinner: Spinner,
  gate: Gate,
  saucer: Saucer,
  lock: Lock,
  magnet: Magnet,
  disc: Disc,
  "ramp-wall": RampWall,
  "ramp-enter": RampEnter,
  "ramp-exit": RampExit,
  "captive-ball": CaptiveBall,
};

/** whether a label names a part type */
export const isPartType = (label: string | null): label is PartType =>
  label != null && Object.prototype.hasOwnProperty.call(PART_CLASSES, label);

/** A ball in play. There is more than one during multiball. */
export class Ball {
  key = "ball-" + Math.random();
  type = "ball" as const;

  /** the drawn ball; each ball in play is drawn as a copy of it */
  elementId: string;
  origin: Vec2Value;
  position: Vec2Value;
  angle = 0;
  radius: number;

  /** on the playfield or up on a ramp: it collides only with its own layer */
  layer: "ground" | "ramp" = "ground";
  /** held by a saucer or lock, until the given game time */
  heldBy: Hold | null = null;
  heldUntil = 0;
  /** game time until which a released ball can't be caught again */
  freeAt = 0;
  /** velocity set on release, for physics to apply once */
  kick: Vec2Value | null = null;
  drained = false;

  /** a new ball starts where the ball is drawn: on the plunger */
  constructor(origin: Vec2Value, radius: number, elementId: string) {
    this.elementId = elementId;
    this.origin = { x: origin.x, y: origin.y };
    this.position = { x: origin.x, y: origin.y };
    this.radius = radius;
  }
}

/** Anything TableView moves: ball, flipper, plunger, captive ball, disc */
export interface MovingPart {
  key: string;
  elementId: string;
  origin: Vec2Value;
  position: Vec2Value;
  angle: number;
}
