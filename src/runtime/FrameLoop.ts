/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from "polymatic";

import { FrameRender, FrameUpdate } from "../events";

/** the longest frame, in ms: the first frame back in a hidden tab can come long after the last */
const MAX_DT = 100;

/** Sends FrameUpdate and FrameRender on each animation frame. */
export class FrameLoop extends Middleware {
  private request = 0;
  private last = 0;

  constructor() {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate = () => {
    this.last = performance.now();
    this.request = requestAnimationFrame(this.frame);
  };

  handleDeactivate = () => {
    cancelAnimationFrame(this.request);
  };

  frame = (now: number) => {
    const ev = { dt: Math.min(now - this.last, MAX_DT), now };
    this.last = now;
    this.emit(FrameUpdate, ev);
    this.emit(FrameRender, ev);
    this.request = requestAnimationFrame(this.frame);
  };
}
