/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { signal } from "@preact/signals";

import { type GameRuntime } from "./shell/context";

/**
 * The shell's handle on the runtime, set once the game is activated. In its own
 * module so the shell can import it without the runtime.
 */
export const runtime = signal<GameRuntime | null>(null);
