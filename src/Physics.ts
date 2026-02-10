// Copyright (c) Ali Shakiba
// Release under the MIT License

import { World, Contact, Body, CircleShape, BoxShape, ChainShape, RevoluteJoint, PolygonShape } from "planck";

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
    // Handle plunger
    if (this.context.plungerPressed) {
      this.context.plungerPower = Math.min(PLUNGER_POWER_MAX, this.context.plungerPower + PLUNGER_POWER_INCREMENT);
    }

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
  ) {
    if (this.context.plungerPressed && plungerData.power > 0) {
      // Manual plunger launch
      const impulse = { x: 0, y: -plungerData.power * 50 };
      ballBody.applyLinearImpulse(impulse, ballBody.getWorldCenter());
      plungerData.power = 0;
    }
  }

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
        linearDamping: 0.1,
      });
      body.createFixture({
        shape: new CircleShape(data.radius),
        density: 1,
      });
      return body;
    },
    update: (data, body) => {
      const pos = body.getPosition();
      data.position.x = pos.x;
      data.position.y = pos.y;
      if (!this.context.plungerPressed && this.context.plungerPower > 0) {
        // Launch ball
        if (data.type === "ball" && body) {
          const impulse = { x: 0, y: this.context.plungerPower };
          body.applyLinearImpulse(impulse, body.getWorldCenter());
        }
        this.context.plungerPower = 0;
      }
    },
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  wallDriver = Driver.create<Wall, Body>({
    filter: (data) => data.type === "wall" || data.type === "drain",
    enter: (data) => {
      const body = this.world.createBody({
        type: "static",
        userData: data,
      });

      const shape = new ChainShape(data.points, false);
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
      const points = data.points.map((p) => ({ x: p.x - data.anchor.x, y: p.y - data.anchor.y }));

      const body = this.world.createBody({
        type: "dynamic",
        position: data.anchor,
        angle: 0,
        userData: data,
      });
      const shape = new PolygonShape(points);
      body.createFixture({
        shape,
        density: FLIPPER_DENSITY,
        restitution: 0.8,
      });

      const anchorBody = this.world.createBody({ type: "static" });
      const joint = this.world.createJoint(
        new RevoluteJoint(
          {
            lowerAngle: data.isLeft ? 0 : -1,
            upperAngle: data.isLeft ? 1 : 0,
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

  plungerDriver = Driver.create<Plunger, Body>({
    filter: (data) => data.type === "plunger",
    enter: (data) => {
      const body = this.world.createBody({
        type: "static",
        userData: data,
      });
      body.createFixture({
        shape: new BoxShape(0.5, 1, { x: 0, y: 0 }, 0),
        density: 1,
      });
      return body;
    },
    update: (data, body) => {},
    exit: (data, body) => {
      this.world.destroyBody(body);
    },
  });

  kickerDriver = Driver.create<Kicker, Body>({
    filter: (data) => data.type === "kicker",
    enter: (data) => {
      const body = this.world.createBody({
        type: "static",
        userData: data,
        position: data.anchor,
      });
      body.createFixture({
        shape: new PolygonShape(data.points),
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
        userData: data,
      });

      const shape = new ChainShape(data.points, false);
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
