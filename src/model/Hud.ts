/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type Signal, signal } from "@preact/signals";

import { type TableInfo, TABLES } from "./tables";

/** A callout, like "Multiball!"; `at` tells the same text made twice apart. */
export interface Callout {
  text: string;
  at: number;
}

/**
 * Everything the shell shows, as signals. The shell reads only these;
 * runtime/HudManager mirrors them from the game once a frame.
 */
export class HudData {
  /** the tables, for the picker */
  tables: TableInfo[] = TABLES;
  /** the table being played, by id */
  table: Signal<string>;

  score: Signal<number>;
  best: Signal<number>;
  /** the ball being played, 1 to `balls` */
  ball: Signal<number>;
  balls: Signal<number>;
  over: Signal<boolean>;
  tilted: Signal<boolean>;
  message: Signal<Callout | null>;

  constructor(table: string) {
    this.table = signal(table);
    this.score = signal(0);
    this.best = signal(0);
    this.ball = signal(1);
    this.balls = signal(3);
    this.over = signal(false);
    this.tilted = signal(false);
    this.message = signal(null);
  }
}
