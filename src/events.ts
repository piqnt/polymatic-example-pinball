/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventType } from "polymatic";

import type { AnyPart, Ball } from "./model";

// Every event, for the runtime and the shell alike.

export interface FrameLoopEvent {
  /** time since the last frame, in ms */
  dt: number;
  now: number;
}

/** From the frame loop, each frame: advance the game by `dt` */
export const FrameUpdate = EventType.create<FrameLoopEvent>("frame-update");

/** From the frame loop, each frame after FrameUpdate: draw */
export const FrameRender = EventType.create<FrameLoopEvent>("frame-render");

/** From the shell: show and play another table, by id */
export const SelectTable = EventType.create<string>("select-table");

/** From the shell, or the plunger after a game: start a new game on this table */
export const NewGame = EventType.create("new-game");

/** From the loader: the table's parts are read */
export const TableLoaded = EventType.create("table-loaded");

/** From physics: the ball hit a part that counts, or a spinner turned half over */
export const Hit = EventType.create<{ part: AnyPart; ball?: Ball }>("hit");

/** From physics: a ball went down the drain */
export const BallDrained = EventType.create<{ ball: Ball }>("ball-drained");

/** From the input: a flipper button went down */
export const FlipperPress = EventType.create<{ left: boolean }>("flipper-press");

/** From the input: bump the table, -1 left, 1 right */
export const Nudge = EventType.create<{ direction: number }>("nudge");
