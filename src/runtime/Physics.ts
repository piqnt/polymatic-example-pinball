/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  World,
  Contact,
  Body,
  CircleShape,
  ChainShape,
  EdgeShape,
  PolygonShape,
  RevoluteJoint,
  PrismaticJoint,
  Settings,
  type Shape,
  type Vec2Value,
} from "planck";
import { Binder, Driver, Middleware } from "polymatic";

import {
  type AnyPart,
  type MainContext,
  type MovingPart,
  Ball,
  Flipper,
  Part,
  Plunger,
  Spinner,
  isPart,
  BUMPER_BOUNCE,
  DISC_GRIP,
  DISC_SPEED,
  FLIPPER_DENSITY,
  FLIPPER_SPEED,
  FLIPPER_SWING,
  FLIPPER_TORQUE,
  KICKER_BOUNCE,
  MAGNET_CYCLE,
  MAGNET_ON,
  MAGNET_PULL,
  NUDGE_IMPULSE,
  PLUNGER_POWER,
  SAUCER_EJECT,
  SAUCER_HOLD,
  SLINGSHOT_BOUNCE,
  SPINNER_FRICTION,
  SPINNER_TAKE,
} from "../model";
import { BallDrained, FrameUpdate, type FrameLoopEvent, Hit, Nudge } from "../events";

// the world is in metres (see UNIT_PER_METER)
Settings.lengthUnitsPerMeter = 1;

/** fixed physics step, in seconds */
const STEP = 1 / 60;

// collision layers: the playfield, the ramps above it, and the balls, which
// collide with one of the first two at a time, and with each other
const GROUND = 0x1;
const RAMP = 0x2;
const BALL = 0x4;
const LAYER_BITS = { ground: GROUND, ramp: RAMP, both: GROUND | RAMP };
const BALL_MASK = { ground: GROUND | BALL, ramp: RAMP | BALL };

/** a part hit again within this many seconds is the same hit */
const HIT_REPEAT = 0.08;
/** a ball released from a saucer or lock can't be caught again for this long, in seconds */
const RELEASE_GRACE = 0.6;

/** time to pull the plunger all the way, and for it to spring back, in seconds */
const PLUNGER_PULL_TIME = 1;
const PLUNGER_RETURN_TIME = 0.2;
const PLUNGER_MOTOR_SPEED = 10;
const PLUNGER_MOTOR_FORCE = 1;
/** how far the plunger can be pulled: a little past full power */
const PLUNGER_TRAVEL = PLUNGER_POWER * 1.1;

/** a ball this close to where balls are served, in metres, and slower than LANE_STILL m/s, is on the plunger */
const LANE_REACH = { x: 0.06, y: 0.15 };
const LANE_STILL = 0.2;

/** copy a body's pose onto its part, for TableView */
const writePose = (data: MovingPart, body: Body) => {
  const { x, y } = body.getPosition();
  data.position.x = x;
  data.position.y = y;
  data.angle = body.getAngle();
};

interface Touch {
  ball: Ball;
  ballBody: Body;
  part: AnyPart;
  contact: Contact;
}

/**
 * The pinball's physics. Each part of the table is a body, made from its shape
 * and kind; the balls are bodies too.
 *
 * During a step, contacts are only noted; after it, when the world can be
 * changed, they are acted on: a ball is caught by a saucer, climbs onto a
 * ramp, knocks a drop target down, and the rules are told of hits and drains.
 */
export class Physics extends Middleware<MainContext> {
  world: World;
  /** simulated time not stepped yet, in seconds */
  rest = 0;
  touches: Touch[] = [];
  /** balls that stopped touching a ramp entrance, to be put on the level they ended up on */
  leaves: Touch[] = [];
  captiveHits: AnyPart[] = [];
  ballBodies = new Map<Ball, Body>();
  plungers = new Map<Plunger, PrismaticJoint>();

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on(FrameUpdate, this.handleFrameUpdate);
    this.on(Nudge, this.handleNudge);
  }

  handleActivate = () => {
    if (this.world) return;
    // less than full gravity: the table is tilted
    this.world = new World({ gravity: { x: 0, y: -1 } });
    this.world.on("pre-solve", this.handlePreSolve);
    this.world.on("begin-contact", this.handleBeginContact);
    this.world.on("end-contact", this.handleEndContact);
  };

  handleFrameUpdate = (ev: FrameLoopEvent) => {
    const ctx = this.context;
    this.rest += ev.dt / 1000;
    while (this.rest >= STEP) {
      this.rest -= STEP;
      this.applyFields();
      this.movePlungers();
      this.world.step(STEP);
      ctx.time += STEP;
      this.afterStep();
    }
    // add and remove bodies, drive the flippers, and copy poses back
    this.binder.setData([...ctx.parts, ...ctx.balls]);
    this.checkLane();
  };

  handleNudge = ({ direction }: { direction: number }) => {
    for (const [ball, body] of this.ballBodies) {
      if (ball.heldBy) continue;
      body.applyLinearImpulse({ x: direction * NUDGE_IMPULSE, y: NUDGE_IMPULSE * 0.5 }, body.getWorldCenter());
    }
  };

  /** spinners wind down, magnets pull, discs drag */
  applyFields() {
    const ctx = this.context;
    for (const part of ctx.parts) {
      switch (part.type) {
        case "spinner":
          this.turnSpinner(part);
          break;
        case "magnet":
          part.active = ctx.time % MAGNET_CYCLE < MAGNET_ON;
          if (part.active) this.pullBalls(part);
          break;
        case "disc":
          part.angle += DISC_SPEED * STEP;
          this.dragBalls(part);
          break;
      }
    }
  }

  /** pressed, a plunger is pulled back; let go, it springs back as far as it was pulled, and comes to rest */
  movePlungers() {
    const pressed = this.context.plungerPressed;
    for (const [part, joint] of this.plungers) {
      if (pressed) part.press = Math.min(PLUNGER_POWER, part.press + (PLUNGER_POWER * STEP) / PLUNGER_PULL_TIME);
      else if (part.press > 0) part.press = -part.press;
      else part.press = Math.min(0, part.press + (PLUNGER_POWER * STEP) / PLUNGER_RETURN_TIME);
      joint.setLimits(-PLUNGER_TRAVEL, -part.press);
    }
  }

  /** a magnet pulls balls to its centre, and steadies them there */
  pullBalls(part: Part) {
    this.forEachBallOver(part, (body, dx, dy, d) => {
      const v = body.getLinearVelocity();
      const m = body.getMass();
      const pull = MAGNET_PULL * (0.4 + (0.6 * d) / part.radius);
      body.applyForceToCenter({
        x: (pull * dx) / (d || 1) - 2 * m * v.x,
        y: (pull * dy) / (d || 1) - 2 * m * v.y,
      });
    });
  }

  /** a disc's floor turns under the balls on it, and carries them round */
  dragBalls(part: Part) {
    this.forEachBallOver(part, (body, dx, dy) => {
      const v = body.getLinearVelocity();
      const m = body.getMass();
      const surface = { x: DISC_SPEED * dy, y: -DISC_SPEED * dx };
      body.applyForceToCenter({ x: DISC_GRIP * m * (surface.x - v.x), y: DISC_GRIP * m * (surface.y - v.y) });
    });
  }

  /** each free ball on the playfield within the part's radius, with its offset to the part's centre */
  forEachBallOver(part: Part, fn: (body: Body, dx: number, dy: number, d: number) => void) {
    for (const [ball, body] of this.ballBodies) {
      if (ball.heldBy || ball.layer !== "ground") continue;
      const p = body.getPosition();
      const dx = part.position.x - p.x;
      const dy = part.position.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d <= part.radius) fn(body, dx, dy, d);
    }
  }

  turnSpinner(part: Spinner) {
    const turns = Math.floor(part.spin);
    part.spin += part.spinSpeed * STEP;
    part.spinSpeed *= Math.exp(-SPINNER_FRICTION * STEP);
    if (part.spinSpeed < 0.3) part.spinSpeed = 0;
    for (let i = turns; i < Math.floor(part.spin); i++) this.emit(Hit, { part });
  }

  handleBeginContact = (contact: Contact) => {
    const touch = this.touchOf(contact);
    if (touch) {
      this.touches.push(touch);
      return;
    }
    // a captive ball knocked into a target scores it
    const a = contact.getFixtureA().getBody().getUserData();
    const b = contact.getFixtureB().getBody().getUserData();
    if (isPart(a) && isPart(b)) {
      if (a.type === "captive-ball" && b.scores) this.captiveHits.push(b);
      if (b.type === "captive-ball" && a.scores) this.captiveHits.push(a);
    }
  };

  handleEndContact = (contact: Contact) => {
    const touch = this.touchOf(contact);
    if (touch?.part.type === "ramp-enter") this.leaves.push(touch);
  };

  handlePreSolve = (contact: Contact) => {
    const touch = this.touchOf(contact);
    if (!touch) return;
    const { part, ballBody } = touch;
    switch (part.type) {
      case "bumper":
        contact.setEnabled(false);
        this.bounceBumper(ballBody, part);
        break;
      case "kicker":
        contact.setEnabled(false);
        this.bounceNormal(ballBody, contact, randomize(KICKER_BOUNCE, 0.1));
        break;
      case "slingshot":
        this.bounceNormal(ballBody, contact, randomize(SLINGSHOT_BOUNCE, 0.1));
        break;
      case "drain":
        contact.setEnabled(false);
        break;
      case "gate": {
        // one way: the ball passes going the gate's way, and bounces off going the other
        const v = ballBody.getLinearVelocity();
        if (v.x * part.direction.x + v.y * part.direction.y > 0) contact.setEnabled(false);
        break;
      }
    }
  };

  /** the ball and the part in a contact, if it is between a ball and a part */
  touchOf(contact: Contact): Touch | null {
    const a = contact.getFixtureA().getBody();
    const b = contact.getFixtureB().getBody();
    const da = a.getUserData();
    const db = b.getUserData();
    if (da instanceof Ball && isPart(db)) return { ball: da, ballBody: a, part: db, contact };
    if (db instanceof Ball && isPart(da)) return { ball: db, ballBody: b, part: da, contact };
    return null;
  }

  afterStep() {
    const ctx = this.context;
    const touches = this.touches;
    this.touches = [];
    for (const { ball, ballBody, part } of touches) {
      if (ball.drained) continue;
      switch (part.type) {
        case "spinner": {
          const v = ballBody.getLinearVelocity();
          part.spinSpeed += Math.hypot(v.x, v.y) * SPINNER_TAKE;
          continue;
        }
        case "saucer":
        case "lock":
          if (ball.heldBy || ctx.time < ball.freeAt || ball.layer !== "ground") continue;
          ball.heldBy = part;
          ball.heldUntil = part.type === "saucer" ? ctx.time + SAUCER_HOLD : Infinity;
          part.full = true;
          break;
        case "drain":
          ball.drained = true;
          this.emit(BallDrained, { ball });
          continue;
        case "drop-target":
          if (part.down) continue;
          part.down = true;
          break;
        case "ramp-enter":
          // the ball is put on a level once it has left the entrance: see leaveEntrance
          continue;
        case "ramp-exit":
          if (ball.layer !== "ramp") continue;
          this.setLayer(ball, ballBody, "ground");
          break;
        default:
          if (!part.scores) continue;
      }
      this.hit(part, ball);
    }
    for (const part of this.captiveHits) this.hit(part);
    this.captiveHits = [];
    const leaves = this.leaves;
    this.leaves = [];
    for (const { ball, ballBody, part } of leaves) this.leaveEntrance(ball, ballBody, part);
    this.holdBalls();
  }

  /** tell the rules of a hit, unless the part was hit just now */
  hit(part: AnyPart, ball?: Ball) {
    if (this.context.time - part.hitAt < HIT_REPEAT) return;
    part.hitAt = this.context.time;
    this.emit(Hit, { part, ball });
  }

  /**
   * A ball leaving a ramp entrance is on the ramp if it is past the entrance,
   * the entrance's way, and between its ends; else on the playfield. So a
   * ball that rolls back out, or brushes an end from outside, stays down.
   */
  leaveEntrance(ball: Ball, body: Body, part: Part) {
    // the entrance's line, from its first point to its last
    const v0 = part.vertices[0];
    const v1 = part.vertices[part.vertices.length - 1];
    const a = { x: part.position.x + v0.x, y: part.position.y + v0.y };
    const b = { x: part.position.x + v1.x, y: part.position.y + v1.y };
    const c = body.getPosition();
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const along = ((c.x - a.x) * ab.x + (c.y - a.y) * ab.y) / (ab.x * ab.x + ab.y * ab.y);
    const past = (c.x - a.x) * part.direction.x + (c.y - a.y) * part.direction.y > 0;
    this.setLayer(ball, body, past && along > 0 && along < 1 ? "ramp" : "ground");
  }

  setLayer(ball: Ball, body: Body, layer: Ball["layer"]) {
    if (ball.layer === layer) return;
    ball.layer = layer;
    body.getFixtureList().setFilterData({ groupIndex: 0, categoryBits: BALL, maskBits: BALL_MASK[layer] });
  }

  /** held balls sit still in their saucer or lock; a released one is kicked out */
  holdBalls() {
    const ctx = this.context;
    for (const [ball, body] of this.ballBodies) {
      if (ball.heldBy) {
        const part = ball.heldBy;
        if (ctx.time >= ball.heldUntil) {
          ball.heldBy = null;
          ball.freeAt = ctx.time + RELEASE_GRACE;
          part.full = ctx.balls.some((other) => other.heldBy === part);
          const out = part.direction ?? { x: 0, y: -1 };
          ball.kick = { x: out.x * SAUCER_EJECT, y: out.y * SAUCER_EJECT };
        } else {
          body.setPosition(part.position);
          body.setLinearVelocity({ x: 0, y: 0 });
          body.setGravityScale(0);
          continue;
        }
      }
      if (ball.kick) {
        body.setGravityScale(1);
        body.setLinearVelocity(ball.kick);
        ball.kick = null;
      }
    }
  }

  /** whether a ball is resting on the plunger, so a touch pulls it */
  checkLane() {
    const template = this.context.ballTemplate;
    this.context.ballInLane =
      !!template &&
      this.context.balls.some((ball) => {
        const body = this.ballBodies.get(ball);
        if (!body) return false;
        const p = body.getPosition();
        const v = body.getLinearVelocity();
        return (
          Math.abs(p.x - template.origin.x) < LANE_REACH.x &&
          Math.abs(p.y - template.origin.y) < LANE_REACH.y &&
          Math.abs(v.y) < LANE_STILL
        );
      });
  }

  bounceBumper(ball: Body, bumper: Part) {
    const ballPos = ball.getPosition();
    const impulse = { x: ballPos.x - bumper.position.x, y: ballPos.y - bumper.position.y };
    const length = Math.hypot(impulse.x, impulse.y);
    if (length === 0) return;
    const magnitude = randomize(BUMPER_BOUNCE, 0.1);
    ball.applyLinearImpulse(
      { x: (impulse.x / length) * magnitude, y: (impulse.y / length) * magnitude },
      ball.getWorldCenter(),
    );
  }

  bounceNormal(ball: Body, contact: Contact, magnitude: number) {
    const normal = contact.getManifold()?.localNormal;
    if (!normal) return;
    ball.applyLinearImpulse({ x: normal.x * magnitude, y: normal.y * magnitude }, ball.getWorldCenter());
  }

  // ---- bodies

  /** a part's shapes: a circle; a polygon if solid, small, closed and convex; else edges if solid, or a chain */
  shapesOf(part: Part, solid: boolean): Shape[] {
    if (part.radius) return [new CircleShape(part.radius)];
    const v = part.vertices;
    if (v.length === 2) return [new EdgeShape(v[0], v[1])];
    if (solid && part.closed && v.length <= 8 && isConvex(v)) return [new PolygonShape(v)];
    if (solid) {
      // a sensor can't be a chain: one edge per side
      const edges: Shape[] = [];
      for (let i = 0; i + 1 < v.length; i++) edges.push(new EdgeShape(v[i], v[i + 1]));
      if (part.closed) edges.push(new EdgeShape(v[v.length - 1], v[0]));
      return edges;
    }
    return [new ChainShape(v, part.closed)];
  }

  partDriver = Driver.create<AnyPart, Body>({
    filter: (part) => isPart(part) && part.body === "static",
    enter: (part) => {
      const body = this.world.createBody({ type: "static", position: part.position, userData: part });
      for (const shape of this.shapesOf(part, part.sensor || part.solid)) {
        body.createFixture({
          shape,
          isSensor: part.sensor,
          restitution: part.restitution,
          friction: part.friction,
          filterCategoryBits: LAYER_BITS[part.layer],
          filterMaskBits: 0xffff,
        });
      }
      return body;
    },
    update: (part, body) => {
      // a drop target that is down is out of the way
      if (part.type === "drop-target" && body.isActive() === part.down) body.setActive(!part.down);
    },
    exit: (part, body) => {
      this.world.destroyBody(body);
    },
  });

  ballDriver = Driver.create<Ball, Body>({
    filter: (data) => data instanceof Ball,
    enter: (ball) => {
      const body = this.world.createBody({ type: "dynamic", bullet: true, position: ball.position, userData: ball });
      body.createFixture({
        shape: new CircleShape(ball.radius),
        density: 1,
        filterCategoryBits: BALL,
        filterMaskBits: BALL_MASK[ball.layer],
      });
      this.ballBodies.set(ball, body);
      return body;
    },
    update: (ball, body) => writePose(ball, body),
    exit: (ball, body) => {
      this.ballBodies.delete(ball);
      this.world.destroyBody(body);
    },
  });

  captiveDriver = Driver.create<AnyPart, Body>({
    filter: (part) => isPart(part) && part.type === "captive-ball",
    enter: (part) => {
      const body = this.world.createBody({ type: "dynamic", bullet: true, position: part.position, userData: part });
      body.createFixture({
        shape: new CircleShape(part.radius),
        density: 1,
        filterCategoryBits: GROUND,
        filterMaskBits: GROUND | BALL,
      });
      return body;
    },
    update: (part, body) => writePose(part, body),
    exit: (part, body) => this.world.destroyBody(body),
  });

  flipperDriver = Driver.create<Flipper, { body: Body; anchor: Body; joint: RevoluteJoint }>({
    filter: (part) => part instanceof Flipper,
    enter: (part) => {
      const body = this.world.createBody({ type: "dynamic", position: part.position, angle: 0, userData: part });
      // a planck polygon has at most 12 corners: a finely drawn flipper is thinned out to that
      const v = part.vertices;
      const corners = v.length <= 12 ? v : Array.from({ length: 12 }, (_, i) => v[Math.floor((i * v.length) / 12)]);
      body.createFixture({ shape: new PolygonShape(corners), density: FLIPPER_DENSITY, restitution: 0.1 });
      const anchor = this.world.createBody({ type: "static" });
      const joint = this.world.createJoint(
        new RevoluteJoint(
          {
            lowerAngle: part.isLeft ? 0 : -FLIPPER_SWING,
            upperAngle: part.isLeft ? FLIPPER_SWING : 0,
            enableLimit: true,
            motorSpeed: 0,
            maxMotorTorque: FLIPPER_TORQUE,
            enableMotor: true,
          },
          anchor,
          body,
          part.anchor,
        ),
      );
      return { body, anchor, joint };
    },
    update: (part, { body, joint }) => {
      writePose(part, body);
      const ctx = this.context;
      // a tilted table's flippers are dead
      const pressed = !ctx.game.tilted && (part.isLeft ? ctx.leftFlipperPressed : ctx.rightFlipperPressed);
      joint.setMotorSpeed(pressed ? (part.isLeft ? FLIPPER_SPEED : -FLIPPER_SPEED) : 0);
      joint.enableMotor(pressed);
    },
    exit: (part, { body, anchor }) => {
      this.world.destroyBody(body);
      this.world.destroyBody(anchor);
    },
  });

  plungerDriver = Driver.create<Plunger, { joint: PrismaticJoint; body: Body; ground: Body }>({
    filter: (part) => part instanceof Plunger,
    enter: (part) => {
      const body = this.world.createBody({
        type: "dynamic",
        position: part.position,
        userData: part,
        bullet: true,
        fixedRotation: true,
      });
      body.createFixture({ shape: new PolygonShape(part.vertices), density: 0.01 });
      const ground = this.world.createBody({ type: "static" });
      const joint = this.world.createJoint(
        new PrismaticJoint(
          {
            lowerTranslation: 0,
            upperTranslation: 0,
            enableLimit: true,
            motorSpeed: PLUNGER_MOTOR_SPEED,
            maxMotorForce: PLUNGER_MOTOR_FORCE,
            enableMotor: true,
          },
          ground,
          body,
          part.position,
          { x: 0, y: 1 },
        ),
      );
      this.plungers.set(part, joint);
      return { body, joint, ground };
    },
    update: (part, { body }) => writePose(part, body),
    exit: (part, { body, ground }) => {
      this.plungers.delete(part);
      this.world.destroyBody(body);
      this.world.destroyBody(ground);
    },
  });

  binder = Binder.create<AnyPart | Ball>({
    key: (data) => data.key,
    drivers: [this.partDriver, this.ballDriver, this.captiveDriver, this.flipperDriver, this.plungerDriver],
  });
}

const randomize = (base: number, variance: number) => {
  return base + base * (Math.random() * 2 - 1) * variance;
};

const isConvex = (v: Vec2Value[]) => {
  let sign = 0;
  for (let i = 0; i < v.length; i++) {
    const a = v[i];
    const b = v[(i + 1) % v.length];
    const c = v[(i + 2) % v.length];
    const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    if (Math.abs(cross) < 1e-12) continue;
    if (sign === 0) sign = Math.sign(cross);
    else if (Math.sign(cross) !== sign) return false;
  }
  return true;
};
