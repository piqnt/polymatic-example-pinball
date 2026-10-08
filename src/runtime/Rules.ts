/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from "polymatic";

import {
  type MainContext,
  type AnyPart,
  type PartType,
  Ball,
  type Lock,
  Hold,
  BALL_SAVE,
  BALLS_PER_GAME,
  DEFAULT_LOCKS,
  GROUP_BONUS,
  JACKPOT,
  TILT_DECAY,
  TILT_LIMIT,
  TILT_PER_NUDGE,
} from "../model";
import { BallDrained, FlipperPress, FrameUpdate, Hit, NewGame, Nudge, TableLoaded } from "../events";

/** how fast a ball that starts multiball is shot up the plunger lane, in m/s */
const AUTO_LAUNCH = 1.7;
/** a bank of drop targets stands back up this long after the last one falls, in seconds */
const BANK_RESET = 1.2;
/** locked balls leave for multiball one at a time: the first after this many seconds, then this far apart */
const MULTIBALL_FIRST = 0.3;
const MULTIBALL_GAP = 0.6;

/**
 * The game: three balls, scoring, and what the parts add up to - lit lane
 * groups, completed target banks, locked balls starting multiball, ramp
 * jackpots, ball save, and the tilt.
 */
export class Rules extends Middleware<MainContext> {
  /** game time when each drop target bank stands back up */
  bankResets = new Map<string, number>();
  /** game time at the last frame */
  time = 0;

  constructor() {
    super();
    // the loader reads the table as the game is activated: start then, and on every table after
    this.on("activate", this.handleNewGame);
    this.on(TableLoaded, this.handleNewGame);
    this.on(NewGame, this.handleNewGame);
    this.on(Hit, this.handleHit);
    this.on(BallDrained, this.handleBallDrained);
    this.on(FlipperPress, this.handleFlipperPress);
    this.on(Nudge, this.handleNudge);
    this.on(FrameUpdate, this.handleFrameUpdate);
  }

  get game() {
    return this.context.game;
  }

  handleNewGame = () => {
    const ctx = this.context;
    if (!ctx.ballTemplate) return;
    ctx.balls = [];
    for (const part of ctx.parts) {
      part.lit = false;
      part.down = false;
      if (part instanceof Hold) part.full = false;
    }
    this.bankResets.clear();
    Object.assign(this.game, {
      state: "playing",
      score: 0,
      ball: 1,
      locked: 0,
      multiball: false,
      tilt: 0,
      tilted: false,
    });
    this.serve();
    this.callout(`Ball 1`);
  };

  /** a new ball on the plunger; with `launch`, shot up the lane at once */
  serve(launch = false) {
    const ctx = this.context;
    const template = ctx.ballTemplate;
    const ball = new Ball(template.origin, template.radius, template.elementId);
    if (launch) ball.kick = { x: 0, y: AUTO_LAUNCH };
    ctx.balls.push(ball);
    this.game.ballSaveUntil = ctx.time + BALL_SAVE;
  }

  handleHit = ({ part }: { part: AnyPart }) => {
    if (this.game.state !== "playing" || this.game.tilted) return;
    let points = part.points;

    switch (part.type) {
      case "rollover":
        part.lit = true;
        this.completeGroup(part, (p) => p.lit, "Lanes complete");
        break;
      case "target":
        part.lit = true;
        this.completeGroup(part, (p) => p.lit, "Targets complete");
        break;
      case "drop-target":
        if (part.group && this.groupOf(part.type, part.group).every((p) => p.down)) {
          this.score(GROUP_BONUS);
          this.callout("Bank down!");
          this.bankResets.set(part.group, this.context.time + BANK_RESET);
        }
        break;
      case "lock":
        this.lock(part);
        break;
      case "ramp-exit":
        if (this.game.multiball) {
          points = JACKPOT;
          this.callout("Jackpot!");
        } else {
          this.callout("Ramp!");
        }
        break;
    }
    this.score(points);
  };

  groupOf(type: PartType, group: string) {
    return this.context.parts.filter((p) => p.type === type && p.group === group);
  }

  /** all of a group lit: a bonus, and they go out to be lit again */
  completeGroup(part: AnyPart, done: (p: AnyPart) => boolean, text: string) {
    if (!part.group) return;
    const group = this.groupOf(part.type, part.group);
    if (!group.every(done)) return;
    this.score(GROUP_BONUS);
    this.callout(text);
    for (const p of group) p.lit = false;
  }

  /** a ball in a lock is kept; enough of them start multiball */
  lock(part: Lock) {
    const ctx = this.context;
    this.game.locked++;
    const needed = part.locks ?? DEFAULT_LOCKS;
    if (this.game.locked >= needed) {
      let next = ctx.time + MULTIBALL_FIRST;
      for (const ball of ctx.balls) {
        if (ball.heldBy?.type !== "lock") continue;
        ball.heldUntil = next;
        next += MULTIBALL_GAP;
      }
      this.game.locked = 0;
      this.game.multiball = true;
      this.serve(true);
      this.callout("Multiball!");
    } else {
      this.serve();
      this.callout(`Ball ${this.game.locked} locked`);
    }
  }

  score(points: number) {
    this.game.score += points;
  }

  handleBallDrained = ({ ball }: { ball: Ball }) => {
    const ctx = this.context;
    ctx.balls = ctx.balls.filter((b) => b !== ball);
    if (this.game.state !== "playing") return;

    // locked balls wait in their lock; the rest are in play
    const inPlay = ctx.balls.filter((b) => b.heldBy?.type !== "lock");
    if (inPlay.length > 0) {
      if (this.game.multiball && inPlay.length === 1) {
        this.game.multiball = false;
        this.callout("Multiball over");
      }
      return;
    }

    if (ctx.time < this.game.ballSaveUntil && !this.game.tilted) {
      this.serve();
      this.callout("Ball saved");
      return;
    }

    this.game.multiball = false;
    this.game.tilted = false;
    this.game.tilt = 0;
    if (this.game.ball >= BALLS_PER_GAME) {
      this.game.state = "over";
      ctx.balls = [];
      return;
    }
    this.game.ball++;
    this.serve();
    this.callout(`Ball ${this.game.ball}`);
  };

  /** a flipper press moves the lit lanes along, so the player can steer them onto the unlit ones */
  handleFlipperPress = ({ left }: { left: boolean }) => {
    if (this.game.state !== "playing") return;
    const groups = new Set<string>();
    for (const part of this.context.parts) if (part.type === "rollover" && part.group) groups.add(part.group);
    for (const group of groups) {
      const lanes = this.groupOf("rollover", group).sort((a, b) => a.position.x - b.position.x);
      const lit = lanes.map((p) => p.lit);
      const n = lanes.length;
      lanes.forEach((p, i) => (p.lit = left ? lit[(i + 1) % n] : lit[(i - 1 + n) % n]));
    }
  };

  handleNudge = () => {
    if (this.game.state !== "playing" || this.game.tilted) return;
    this.game.tilt += TILT_PER_NUDGE;
    if (this.game.tilt > TILT_LIMIT) {
      this.game.tilted = true;
      this.callout("Tilt");
    } else if (this.game.tilt > TILT_LIMIT - TILT_PER_NUDGE) {
      this.callout("Danger");
    }
  };

  handleFrameUpdate = () => {
    const ctx = this.context;
    const game = this.game;
    game.tilt = Math.max(0, game.tilt - TILT_DECAY * (ctx.time - this.time));
    this.time = ctx.time;

    for (const [group, at] of this.bankResets) {
      if (ctx.time < at) continue;
      this.bankResets.delete(group);
      for (const part of this.groupOf("drop-target", group)) part.down = false;
    }

    // lights the table's art can show (data-light)
    const lights = ctx.lights;
    lights.clear();
    if (game.state === "playing") {
      if (ctx.time < game.ballSaveUntil) lights.add("ball-save");
      if (game.multiball) lights.add("multiball");
      if (game.tilted) lights.add("tilt");
      for (let i = 1; i <= game.locked; i++) lights.add(`lock-${i}`);
      for (let i = 1; i <= game.ball; i++) lights.add(`ball-${i}`);
    }
  };

  callout(text: string) {
    this.context.callout = { text, at: performance.now() };
  }
}
