/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from "polymatic";

import { type MainContext } from "../model";
import { Nudge } from "../events";

/**
 * Keeps the keys held down in the context, and nudges the table on the Shift
 * keys: left Shift bumps it left, right Shift right.
 */
export class KeyboardManager extends Middleware<MainContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("blur", this.handleBlur);
  };

  handleDeactivate = () => {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("blur", this.handleBlur);
  };

  handleKeyDown = (event: KeyboardEvent) => {
    // keys on the hud's controls are theirs
    if (event.target instanceof Element && event.target.closest("#ui-root button, #ui-root [role=dialog]")) return;
    this.context.keysPressed.add(event.code);
    if (event.repeat) return;
    if (event.code === "ShiftLeft") this.emit(Nudge, { direction: -1 });
    if (event.code === "ShiftRight") this.emit(Nudge, { direction: 1 });
    if (event.code === "Space" || event.code.startsWith("Arrow")) event.preventDefault();
  };

  handleKeyUp = (event: KeyboardEvent) => {
    this.context.keysPressed.delete(event.code);
  };

  /** keys released while the window is unfocused would stay down */
  handleBlur = () => {
    this.context.keysPressed.clear();
  };
}
