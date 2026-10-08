/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from "preact";

import { App } from "./shell/App";
import "./shell/engineers-plate.css";

// the shell renders first; the game loads after, and fills in the `runtime` signal
render(<App />, document.getElementById("ui-root") as HTMLElement);

import("./async-loader");
