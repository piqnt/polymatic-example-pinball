/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from "preact";
import { useContext } from "preact/hooks";
import type { Middleware } from "polymatic";

import { type MainContext, type TableInfo } from "../model";

/**
 * What a component is handed: the shared context to read signals off (in
 * `context.hud`), and the runtime's emit to send events back. The shell never
 * holds a middleware.
 */
export interface GameRuntime {
  context: MainContext;
  emit: Middleware["emit"];
}

export const GameContext = createContext<GameRuntime | null>(null);

export function useRuntime(): GameRuntime {
  const runtime = useContext(GameContext);
  if (!runtime) throw new Error("useRuntime must be used within a GameContext.Provider");
  return runtime;
}

/** the table being played */
export function useCurrentTable(): TableInfo {
  const { tables, table } = useRuntime().context.hud;
  return tables.find((t) => t.id === table.value) ?? tables[0];
}
