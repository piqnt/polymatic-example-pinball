// Copyright (c) Ali Shakiba
// Release under the MIT License

import {
  World,
  Contact,
  Body,
  CircleShape,
  ChainShape,
  RevoluteJoint,
  PolygonShape,
  PrismaticJoint,
} from "planck";

import { Binder, Driver, Middleware } from "polymatic";

import { MainContext } from "./Main";
import { Ball, Wall, Flipper, Bumper, Plunger, Kicker, Slingshot, TablePart } from "./Data";
import {
  BUMPER_BOUNCE,
  FLIPPER_DENSITY,
  FLIPPER_SPEED,
  FLIPPER_TORQUE,
  KICKER_BOUNCE,
  PLUNGER_POWER_INCREMENT,
  PLUNGER_POWER_MAX,
  SLINGSHOT_BOUNCE,
} from "./Config";

type BodyDataType = Ball | TablePart;

/**
 * Physics simulation for pinball game.
 */
export class Physics extends Middleware<MainContext> {
  world: World;
  time: number = 0;
  timeStep = 1000 / 30;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("frame-update", this.handleFrameUpdate);
  }

  handleActivate() {
    if (this.world) return;

    this.world = new World({
      // we don't need full gravity since the table is tilted
      gravity: { x: 0, y: -1 },
    });
    this.world.on("pre-solve", this.handleContact);

    this.context.world = this.world;
  }

  handleFrameUpdate = () => {
    // Update context data from physics
    this.binder.data([this.context.ball, ...this.context.parts, ...this.context.flippers, this.context.plunger]);
  };

  handleContact = (contact: Contact) => {
    const fixtureA = contact.getFixtureA();
    const bodyA = fixtureA.getBody();
    const fixtureB = contact.getFixtureB();
    const bodyB = fixtureB.getBody();

    const dataA = bodyA.getUserData() as BodyDataType;
    const dataB = bodyB.getUserData() as BodyDataType;

    if (!dataA || !dataB) return;

    if (dataB.type === "ball" && dataA.type === "bumper") {
      this.collideBallBumper(bodyB, bodyA, contact);
    } else if (dataA.type === "ball" && dataB.type === "bumper") {
      this.collideBallBumper(bodyA, bodyB, contact);
    } else if (dataB.type === "ball" && dataA.type === "plunger") {
      this.collideBallPlunger(bodyB, dataB, bodyA, dataA, contact);
    } else if (dataA.type === "ball" && dataB.type === "plunger") {
      this.collideBallPlunger(bodyA, dataA, bodyB, dataB, contact);
    } else if (dataB.type === "ball" && dataA.type === "kicker") {
      this.collideBallKicker(bodyB, dataB, bodyA, dataA, contact);
    } else if (dataA.type === "ball" && dataB.type === "kicker") {
      this.collideBallKicker(bodyA, dataA, bodyB, dataB, contact);
    } else if (dataB.type === "ball" && dataA.type === "slingshot") {
      this.collideBallSlingshot(bodyB, bodyA, contact);
    } else if (dataA.type === "ball" && dataB.type === "slingshot") {
      this.collideBallSlingshot(bodyA, bodyB, contact);
    } else if (dataB.type === "ball" && dataA.type === "drain") {
      this.collideBallDrain(bodyB, bodyA, contact);
    } else if (dataA.type === "ball" && dataB.type === "drain") {
      this.collideBallDrain(bodyA, bodyB, contact);
    }
  };

  collideBallKicker(ball: Body, ballData: Ball | TablePart, kicker: Body, kickerData: Kicker, contact: Contact) {
    contact.setEnabled(false);

    const manifold = contact?.getManifold();
    const normal = manifold?.localNormal;
    if (!normal) return;

    const impulse = { x: normal.x, y: normal.y };

    const impulseMagnitude = randomize(KICKER_BOUNCE, 0.1);
    impulse.x *= impulseMagnitude;
    impulse.y *= impulseMagnitude;

    ball.applyLinearImpulse(impulse, ball.getWorldCenter());
  }

  collideBallPlunger(
    ballBody: Body,
    ballData: Ball | TablePart,
    plungerBody: Body,
    plungerData: Plunger,
    contact: Contact,
  ) {}

  collideBallBumper(ball: Body, bumper: Body, contact: Contact) {
    contact.setEnabled(false);
    const ballPos = ball.getPosition();
    const bumperPos = bumper.getPosition();

    const impulse = {
      x: ballPos.x - bumperPos.x,
      y: ballPos.y - bumperPos.y,
    };
    const length = Math.sqrt(impulse.x * impulse.x + impulse.y * impulse.y);
    if (length === 0) return;

    impulse.x /= length;
    impulse.y /= length;

    const impulseMagnitude = randomize(BUMPER_BOUNCE, 0.1);
    impulse.x *= impulseMagnitude;
    impulse.y *= impulseMagnitude;

    ball.applyLinearImpulse(impulse, ball.getWorldCenter());
  }

  collideBallSlingshot(ball: Body, slingshotBody: Body, contact: Contact) {
    // contact.setEnabled(false);
    const manifold = contact?.getManifold();
    const normal = manifold?.localNormal;
    if (!normal) return;

    const impulse = { x: normal.x, y: normal.y };

    const impulseMagnitude = randomize(SLINGSHOT_BOUNCE, 0.1);
    impulse.x *= impulseMagnitude;
    impulse.y *= impulseMagnitude;

    ball.applyLinearImpulse(impulse, ball.getWorldCenter());
  }

  collideBallDrain(ball: Body, drain: Body, contact: Contact) {
    contact.setEnabled(false);
    const data = ball.getUserData() as Ball;
    this.context.ball = new Ball(data.init, data.radius);
  }

  ballDriver = Driver.create<Ball, Body>({
    filter: (data) => data.type === "ball",
    enter: (data) => {
      const body = this.world.createBody({
        type: "dynamic",
        bullet: true,
        position: data.position,
        userData: data,
      });
      body.createFixture({
        shape: new CircleShape(data.radius),
        density: 1,
      });
      return body;
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  wallDriver = Driver.create<Wall, Body>({
    filter: (data) => data.type === "wall" || data.type === "drain",
    enter: (data) => {
      const body = this.world.createBody({
        type: "static",
        position: data.position,
        userData: data,
      });

      const shape = new ChainShape(data.vertices, false);
      body.createFixture({
        shape,
        restitution: 0.3,
      });

      return body;
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  flipperDriver = Driver.create<Flipper, { body: Body; anchor: Body; joint: RevoluteJoint }>({
    filter: (data) => data.type === "flipper",
    enter: (data) => {
      const body = this.world.createBody({
        type: "dynamic",
        position: data.position,
        angle: 0,
        userData: data,
      });
      const shape = new PolygonShape(data.vertices);
      body.createFixture({
        shape,
        density: FLIPPER_DENSITY,
        restitution: 0.1,
      });

      const anchorBody = this.world.createBody({ type: "static" });
      const joint = this.world.createJoint(
        new RevoluteJoint(
          {
            lowerAngle: data.isLeft ? 0 : -0.9,
            upperAngle: data.isLeft ? 0.9 : 0,
            enableLimit: true,
            motorSpeed: 0,
            maxMotorTorque: FLIPPER_TORQUE,
            enableMotor: true,
          },
          anchorBody,
          body,
          data.anchor,
        ),
      );

      return { body, anchor: anchorBody, joint };
    },
    update: (data, { body, joint }) => {
      if (data.isLeft) {
        joint.setMotorSpeed(this.context.leftFlipperPressed ? FLIPPER_SPEED : 0);
        joint.enableMotor(this.context.leftFlipperPressed);
      } else {
        joint.setMotorSpeed(this.context.rightFlipperPressed ? -FLIPPER_SPEED : 0);
        joint.enableMotor(this.context.rightFlipperPressed);
      }
    },
    exit: (data, { body, anchor, joint }) => {
      this.world.destroyJoint(joint);
      this.world.destroyBody(body);
      this.world.destroyBody(anchor);
    },
  });

  bumperDriver = Driver.create<Bumper, Body>({
    filter: (data) => data.type === "bumper",
    enter: (data) => {
      const body = this.world.createBody({
        type: "static",
        position: data.position,
        userData: data,
      });
      body.createFixture({
        shape: new CircleShape(data.radius),
      });
      return body;
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  plungerDriver = Driver.create<Plunger, { joint: PrismaticJoint; body: Body }>({
    filter: (data) => data.type === "plunger",
    enter: (data) => {
      const body = this.world.createBody({
        type: "dynamic",
        position: data.position,
        userData: data,
        bullet: true,
        fixedRotation: true,
      });
      body.createFixture({
        shape: new PolygonShape(data.vertices),
        density: 0.01,
      });

      const ground = this.world.createBody({ type: "static" });

      const joint = this.world.createJoint(
        new PrismaticJoint(
          {
            lowerTranslation: 0,
            upperTranslation: 0,
            enableLimit: true,
            motorSpeed: 15,
            maxMotorForce: 10000,
            enableMotor: true,
          },
          ground,
          body,
          data.position,
          { x: 0, y: 1 },
        ),
      );

      return { body, joint };
    },
    update: (data, { joint, body }) => {
      if (this.context.plungerPressed) {
        data.power = Math.min(PLUNGER_POWER_MAX, data.power + PLUNGER_POWER_INCREMENT);
        joint.setLimits(-PLUNGER_POWER_MAX * 1.1, -data.power);
      } else {
        data.power = Math.max(0, data.power - PLUNGER_POWER_INCREMENT);
        joint.setLimits(-PLUNGER_POWER_MAX * 1.1, data.power);
      }
    },
    exit: (data, { body }) => {
      this.world.destroyBody(body);
    },
  });

  kickerDriver = Driver.create<Kicker, Body>({
    filter: (data) => data.type === "kicker",
    enter: (data) => {
      const body = this.world.createBody({
        type: "static",
        userData: data,
        position: data.position,
      });
      body.createFixture({
        shape: new PolygonShape(data.vertices),
        density: 1,
      });
      return body;
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  slingshotDriver = Driver.create<Slingshot, Body>({
    filter: (data) => data.type === "slingshot",
    enter: (data) => {
      const body = this.world.createBody({
        type: "static",
        position: data.position,
        userData: data,
      });

      const shape = new ChainShape(data.vertices, false);
      body.createFixture({
        shape,
      });

      return body;
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  binder = Binder.create<Ball | TablePart>({
    key: (data) => data.key,
    drivers: [
      this.ballDriver,
      this.wallDriver,
      this.flipperDriver,
      this.bumperDriver,
      this.plungerDriver,
      this.kickerDriver,
      this.slingshotDriver,
    ],
  });
}

const randomize = (base: number, variance: number) => {
  return base + base * (Math.random() * 2 - 1) * variance;
};
