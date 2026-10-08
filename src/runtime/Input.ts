/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from "polymatic";

import { type MainContext } from "../model";
import { KeyboardManager } from "./Keyboard";
import { PointerManager } from "./Pointer";
import { FlipperPress, FrameUpdate, NewGame } from "../events";

/**
 * Turns keys and touches into the flippers and the plunger. Keys: left and
 * right arrows (or A and D) flip, space, enter, S or down pull the plunger.
 * Touch: the left or right half of the screen flips that side, and pulls the
 * plunger when a ball is sitting on it.
 */
export class InputManager extends Middleware<MainContext> {
  constructor() {
    super();
    this.on(FrameUpdate, this.handleFrameUpdate);
    this.use(new KeyboardManager());
    this.use(new PointerManager());
  }

  handleFrameUpdate = () => {
    const ctx = this.context;
    const sides = new Set(ctx.activePointers.values());
    const leftTouched = sides.has("left");
    const rightTouched = sides.has("right");

    const keys = ctx.keysPressed;
    const left = leftTouched || keys.has("ArrowLeft") || keys.has("KeyA");
    const right = rightTouched || keys.has("ArrowRight") || keys.has("KeyD");
    const plunger =
      keys.has("Space") ||
      keys.has("Enter") ||
      keys.has("KeyS") ||
      keys.has("ArrowDown") ||
      (ctx.ballInLane && (leftTouched || rightTouched));

    if (left && !ctx.leftFlipperPressed) this.emit(FlipperPress, { left: true });
    if (right && !ctx.rightFlipperPressed) this.emit(FlipperPress, { left: false });
    // after the game, the plunger starts the next one
    if (plunger && !ctx.plungerPressed && ctx.game.state === "over") this.emit(NewGame);

    ctx.leftFlipperPressed = left;
    ctx.rightFlipperPressed = right;
    ctx.plungerPressed = plunger;
  };
}
