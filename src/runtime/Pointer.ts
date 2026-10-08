/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from "polymatic";

import { type MainContext } from "../model";

/** Presses here are the hud's, not flips. */
const HUD_CONTROLS = "#ui-root button, #ui-root [role=dialog]";

/** Keeps each pointer held down in the context, by the half of the screen it is on. */
export class PointerManager extends Middleware<MainContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    window.addEventListener("pointerdown", this.handleDown, { passive: false });
    window.addEventListener("pointermove", this.handleMove);
    window.addEventListener("pointerup", this.handleUp);
    window.addEventListener("pointercancel", this.handleUp);
  };

  handleDeactivate = () => {
    window.removeEventListener("pointerdown", this.handleDown);
    window.removeEventListener("pointermove", this.handleMove);
    window.removeEventListener("pointerup", this.handleUp);
    window.removeEventListener("pointercancel", this.handleUp);
    this.context.activePointers.clear();
  };

  handleDown = (event: PointerEvent) => {
    if (event.target instanceof Element && event.target.closest(HUD_CONTROLS)) return;
    event.preventDefault();
    this.context.activePointers.set(event.pointerId, sideOf(event));
  };

  handleMove = (event: PointerEvent) => {
    if (!this.context.activePointers.has(event.pointerId)) return;
    this.context.activePointers.set(event.pointerId, sideOf(event));
  };

  handleUp = (event: PointerEvent) => {
    this.context.activePointers.delete(event.pointerId);
  };
}

const sideOf = (event: PointerEvent) => (event.clientX < window.innerWidth / 2 ? "left" : "right");
