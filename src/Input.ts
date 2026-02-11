// Copyright (c) Ali Shakiba
// Release under the MIT License

import { Middleware } from "polymatic";

import { MainContext } from "./Main";
import { KeyboardManager } from "./Keyboard";
import { PointerManager } from "./Pointer";

export class InputManager extends Middleware<MainContext> {
  constructor() {
    super();
    this.on("frame-update", this.handleFrameUpdate);
    this.use(new KeyboardManager());
    this.use(new PointerManager());
  }

  handleFrameUpdate = () => {
    let leftTouched = false;
    let rightTouched = false;
    this.context.activePointers.forEach((pointer, id) => {
      const side = pointer.side;
      if (side === "left") {
        leftTouched = true;
      } else if (side === "right") {
        rightTouched = true;
      }
    });

    const leftPressed = this.context.keysPressed.has("ArrowLeft") || this.context.keysPressed.has("KeyA");
    const rightPressed = this.context.keysPressed.has("ArrowRight") || this.context.keysPressed.has("KeyD");
    const plungerPressed =
      this.context.keysPressed.has("Space") ||
      this.context.keysPressed.has("Enter") ||
      this.context.keysPressed.has("KeyS") ||
      this.context.keysPressed.has("ArrowDown");

    this.context.leftFlipperPressed = leftTouched || leftPressed;
    this.context.rightFlipperPressed = rightTouched || rightPressed;
    this.context.plungerPressed = leftTouched || rightTouched || plungerPressed;
  };
}
