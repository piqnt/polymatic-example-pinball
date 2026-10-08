/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { runtime } from "../async-signals";
import { GameContext } from "./context";
import { Hud } from "./Hud";

/**
 * The shell. It mounts before the runtime exists (see index.tsx), so it draws
 * nothing until `runtime` is filled in.
 */
export function App() {
  return <GameContext.Provider value={runtime.value ?? null}>{runtime.value && <Hud />}</GameContext.Provider>;
}
