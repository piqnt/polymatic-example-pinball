// Copyright (c) Ali Shakiba
// Release under the MIT License

import { Middleware } from "polymatic";

import { MainContext } from "./Main";

/**
 * KeyboardManager handles keyboard events and stores them in context.
 */
export class KeyboardManager extends Middleware<MainContext> {
  constructor() {
    super();
    this.on("activate", this.handleActivate);
  }

  handleActivate = () => {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  };

  handleDeactivate = () => {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  };

  handleKeyDown = (event: KeyboardEvent) => {
    this.context.keysPressed.add(event.code);
  };

  handleKeyUp = (event: KeyboardEvent) => {
    this.context.keysPressed.delete(event.code);
  };
}
