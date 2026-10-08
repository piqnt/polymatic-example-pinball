/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NewGame, SelectTable } from "../events";
import { type GameRuntime } from "./context";

// Everything a control can do. Components call these, never emit inline.

/** @action */
export function selectTable({ emit }: GameRuntime, id: string) {
  emit(SelectTable, id);
}

/** @action */
export function newGame({ emit }: GameRuntime) {
  emit(NewGame);
}
