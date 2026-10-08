/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Failure, Middleware } from "polymatic";

import { type MainContext } from "../model";
import { FrameLoop } from "./FrameLoop";
import { TableLoader } from "./TableLoader";
import { InputManager } from "./Input";
import { Physics } from "./Physics";
import { Rules } from "./Rules";
import { TableView } from "./TableView";
import { HudManager } from "./HudManager";

/**
 * Each table is an svg file: the loader reads its parts for physics, TableView
 * shows it as drawn and moves its parts, and the rules play the game on it.
 * The shell (shell/) reads its signals in `context.hud`.
 *
 * Each frame runs input, then physics, then the rules.
 */
export class Main extends Middleware<MainContext> {
  constructor() {
    super();
    this.use(new FrameLoop());
    this.use(new TableLoader());
    this.use(new InputManager());
    this.use(new Physics());
    this.use(new Rules());
    this.use(new TableView());
    this.use(new HudManager());

    this.on(Failure, (f) => {
      console.error(`Pinball: a handler for "${f.type}" failed`, f.error);
      return true;
    });
  }
}
