// Copyright (c) Ali Shakiba
// Release under the MIT License

import { Middleware } from "polymatic";
import { ContainerLoader, DefaultTestbedContext, FrameLoop, StageLoader, WorldStep, WorldView } from "planck-testbed";

import { Physics } from "./Physics";
import { SvgTable } from "./SvgTable";
import { Ball, Flipper, Plunger, TablePart } from "./Data";
import { InputManager } from "./Input";
import { PointerInfo } from "./Pointer";

export class MainContext extends DefaultTestbedContext {
  ball: Ball;
  parts: TablePart[];
  plunger: Plunger;
  flippers: Flipper[];

  activePointers: Map<number, PointerInfo> = new Map();
  keysPressed = new Set<string>();

  leftFlipperPressed = false;
  rightFlipperPressed = false;
  plungerPressed = false;
}

export class Main extends Middleware<MainContext> {
  constructor() {
    super();
    // imported from planck-testbed, for rendering the world
    this.use(new FrameLoop());
    this.use(new ContainerLoader());
    this.use(new StageLoader());
    this.use(new WorldStep());
    this.use(new WorldView());

    // pinball middlewares
    this.use(new SvgTable());
    this.use(new Physics());
    this.use(new InputManager());
  }
}
