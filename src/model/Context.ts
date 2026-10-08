/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type AnyPart, Ball } from "./Parts";
import { type Callout, HudData } from "./Hud";
import { tableFromHash } from "./tables";

export interface Game {
  state: "playing" | "over";
  score: number;
  /** the ball being played, from 1 */
  ball: number;
  locked: number;
  multiball: boolean;
  /** game time until which a drained ball is given back */
  ballSaveUntil: number;
  tilt: number;
  tilted: boolean;
}

/** Shared by the runtime and the shell; the shell's signals are in `hud`. */
export class MainContext {
  /** the table being played, by id (see tables.ts) */
  table = tableFromHash();
  hud = new HudData(this.table);

  /** game time, in seconds */
  time = 0;

  /** the table's drawing: the loader reads parts from it, and TableView shows it */
  drawing: SVGSVGElement | null = null;
  /** the table's parts, flippers and plunger included */
  parts: AnyPart[] = [];
  /** where a new ball is drawn and served: on the plunger */
  ballTemplate: Ball | null = null;
  /** balls in play, held ones included */
  balls: Ball[] = [];

  game: Game = {
    state: "over",
    score: 0,
    ball: 1,
    locked: 0,
    multiball: false,
    ballSaveUntil: 0,
    tilt: 0,
    tilted: false,
  };
  /** named lights for the table's art (data-light), like "ball-save" or "lock-1" */
  lights = new Set<string>();
  /** the rules' latest callout, for the hud */
  callout: Callout | null = null;

  /** the side of the screen each pointer held down is on */
  activePointers = new Map<number, "left" | "right">();
  keysPressed = new Set<string>();

  leftFlipperPressed = false;
  rightFlipperPressed = false;
  plungerPressed = false;
  /** a ball is on the plunger, so a touch pulls it */
  ballInLane = false;
}
