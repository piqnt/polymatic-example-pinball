// Copyright (c) Ali Shakiba
// Release under the MIT License

import { Middleware } from "polymatic";
import * as Stage from "stage-js";
import { Vec2Value } from "planck";

import { MainContext } from "./Main";

const scale = 5;

/**
 * Rendering for pinball game using plain canvas.
 */
export class Terminal extends Middleware<MainContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("frame-update", this.handleFrameUpdate);
    this.on("stage-ready", this.handleStageReady);
  }

  handleActivate = () => {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  };

  handleStageReady = () => {
    this.context.stage.on(Stage.POINTER_DOWN, this.handlePointerStart);
    this.context.stage.on(Stage.POINTER_UP, this.handlePointerEnd);
    this.context.stage.on(Stage.POINTER_CANCEL, this.handlePointerEnd);
  };

  handleDeactivate = () => {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    this.context.stage.off(Stage.POINTER_DOWN, this.handlePointerStart);
    this.context.stage.off(Stage.POINTER_UP, this.handlePointerEnd);
    this.context.stage.off(Stage.POINTER_CANCEL, this.handlePointerEnd);
  };

  handleFrameUpdate = () => {
    // Handle input
    const leftPressed = this.keysPressed.has("ArrowLeft") || this.keysPressed.has("KeyA");
    const rightPressed = this.keysPressed.has("ArrowRight") || this.keysPressed.has("KeyD");
    const plungerPressed =
      this.keysPressed.has("Space") ||
      this.keysPressed.has("Enter") ||
      this.keysPressed.has("KeyS") ||
      this.keysPressed.has("ArrowDown");

    // Set context fields
    this.context.leftFlipperPressed = leftPressed;
    this.context.rightFlipperPressed = rightPressed;
    this.context.plungerPressed = plungerPressed;
  };

  keysPressed = new Set<string>();

  handleKeyDown = (event: KeyboardEvent) => {
    this.keysPressed.add(event.code);
  };

  handleKeyUp = (event: KeyboardEvent) => {
    this.keysPressed.delete(event.code);
  };

  handlePointerStart = (event: Vec2Value) => {
    const direction = event.x - this.context.camera.x;
    if (direction > 0) {
      this.keysPressed.add("ArrowRight");
      this.keysPressed.add("ArrowDown");
    } else {
      this.keysPressed.add("ArrowLeft");
    }
  };
  handlePointerEnd = (event: Vec2Value) => {
    this.keysPressed.delete("ArrowRight");
    this.keysPressed.delete("ArrowLeft");
    this.keysPressed.delete("ArrowDown");
  };
}
