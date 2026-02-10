// Copyright (c) Ali Shakiba
// Release under the MIT License

import { Middleware } from "polymatic";
import { Physics } from "./Physics";
import { Terminal } from "./Terminal";
import { SvgTable } from "./SvgTable";
import { Ball, Flipper, Plunger, TablePart } from "./Data";
import { DefaultTestbedContext, TestbedMain } from "planck-testbed/v1";

export class MainContext extends DefaultTestbedContext {
  ball: Ball;
  parts: TablePart[];
  plunger: Plunger;
  flippers: Flipper[];
  leftFlipperPressed: boolean;
  rightFlipperPressed: boolean;
  plungerPressed: boolean;
  plungerPower: number;
  constructor() {
    super();
  }
}

export class Main extends Middleware<MainContext> {
  constructor() {
    super();
    this.use(new SvgTable());
    this.use(new Physics());
    this.use(new Terminal());
    this.use(new TestbedMain());
  }
}
