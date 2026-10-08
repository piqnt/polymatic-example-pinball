/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from "polymatic";

import { type MainContext, BALLS_PER_GAME } from "../model";
import { FrameRender } from "../events";

/**
 * The one place the runtime talks to the shell: once a frame, copies what the
 * hud shows onto `context.hud`'s signals, which only notify on a change. Also
 * keeps each table's best score.
 */
export class HudManager extends Middleware<MainContext> {
  constructor() {
    super();
    this.on(FrameRender, this.handleFrameRender);
  }

  handleFrameRender = () => {
    const { hud, game, table, callout } = this.context;
    const key = "pinball-best-" + table;
    const stored = readBest(key);
    if (game.score > stored) writeBest(key, game.score);

    hud.table.value = table;
    hud.score.value = game.score;
    hud.best.value = Math.max(game.score, stored);
    hud.ball.value = game.ball;
    hud.balls.value = BALLS_PER_GAME;
    hud.over.value = game.state === "over";
    hud.tilted.value = game.tilted;
    hud.message.value = callout;
  };
}

const bests = new Map<string, number>();

function readBest(key: string) {
  if (!bests.has(key)) {
    let value = 0;
    try {
      value = Number(localStorage.getItem(key)) || 0;
    } catch {
      // no storage: the best lasts until the page closes
    }
    bests.set(key, value);
  }
  return bests.get(key);
}

function writeBest(key: string, value: number) {
  bests.set(key, value);
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // no storage
  }
}
