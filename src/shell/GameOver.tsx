/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TbPlayerPlayFilled } from "react-icons/tb";

import { useCurrentTable, useRuntime } from "./context";
import { newGame } from "./actions";
import styles from "./Shell.module.css";

/**
 * The end of a game, on a paper card like the table menu's: the score, a new
 * best stamped in red, and play again or pick another table.
 */
export function GameOver({ onTables }: { onTables: () => void }) {
  const runtime = useRuntime();
  const { hud } = runtime.context;
  const table = useCurrentTable();
  if (!hud.over.value) return null;
  const best = hud.best.value;
  const score = hud.score.value;
  const newBest = score > 0 && score >= best;
  return (
    <div class={`${styles.menuBackdrop} ${styles.overBackdrop}`}>
      <div class={`${styles.menu} ${styles.card}`} role="dialog" aria-labelledby="game-over-title">
        <h2 id="game-over-title" class={styles.menuTitle}>
          Game over
        </h2>
        <p class={styles.menuSub}>{table.name}</p>
        <span class={styles.cardScore}>{score.toLocaleString()}</span>
        {newBest ? (
          <span class={styles.stamp}>New best!</span>
        ) : (
          <span class={styles.cardBest}>Best {best.toLocaleString()}</span>
        )}
        <div class={styles.cardButtons}>
          <button
            type="button"
            class={`${styles.inkButton} ${styles.inkSolid}`}
            onClick={() => newGame(runtime)}
            autoFocus
          >
            <TbPlayerPlayFilled aria-hidden />
            Play again
          </button>
          <button type="button" class={styles.inkButton} onClick={onTables}>
            Other tables
          </button>
        </div>
      </div>
    </div>
  );
}
