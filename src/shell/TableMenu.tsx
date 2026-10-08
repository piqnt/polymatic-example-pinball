/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from "preact/hooks";
import { GiCheckMark } from "react-icons/gi";

import { useRuntime } from "./context";
import { selectTable } from "./actions";
import styles from "./Shell.module.css";

const MENU_SEEN = "pinball-menu-seen";

/** the menu has never been shown, and the page wasn't opened on a table's link */
export function isFirstVisit() {
  if (location.hash) return false;
  try {
    return !localStorage.getItem(MENU_SEEN);
  } catch {
    // no storage, so no way to show it only once: don't show it
    return false;
  }
}

export function markMenuSeen() {
  try {
    localStorage.setItem(MENU_SEEN, "1");
  } catch {
    // not remembered, then
  }
}

/**
 * The tables, on a paper card like a machine's instruction card. Picking one
 * plays it; Escape, the close mark, or a press off the card closes it. On a
 * first visit (`chosen` false) no table is marked as playing.
 */
export function TableMenu({
  chosen,
  engineersPlate,
  onEngineersPlate,
  onClose,
}: {
  chosen: boolean;
  engineersPlate: boolean;
  onEngineersPlate: (on: boolean) => void;
  onClose: () => void;
}) {
  const runtime = useRuntime();
  const currentId = runtime.context.hud.table.value;
  const markedId = chosen ? currentId : null;

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div
      class={styles.menuBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="table-menu-title"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* with no table marked, the card takes focus, so none looks picked */}
      <div class={styles.menu} tabIndex={-1} autoFocus={markedId == null}>
        <button type="button" class={styles.menuClose} aria-label="Close" onClick={onClose}>
          ×
        </button>
        <h2 id="table-menu-title" class={styles.menuTitle}>
          Tables
        </h2>
        <p class={styles.menuSub}>choose a table to play</p>
        <ul class={styles.menuList}>
          {runtime.context.hud.tables.map((table) => (
            <li key={table.id}>
              <button
                type="button"
                class={styles.entry}
                aria-current={table.id === markedId}
                autoFocus={table.id === markedId}
                onClick={() => {
                  onClose();
                  if (table.id !== currentId) selectTable(runtime, table.id);
                }}
              >
                <span class={styles.entryName}>{table.name}</span>
                <span class={styles.leader} aria-hidden />
                <span class={styles.entryNote}>{table.id === markedId ? "playing" : ""}</span>
                <span class={styles.entryBlurb}>{table.blurb}</span>
              </button>
            </li>
          ))}
        </ul>
        <label class={styles.viewOption}>
          {/* the real checkbox, for keys and screen readers, under a printed one */}
          <input
            type="checkbox"
            class={styles.tickInput}
            checked={engineersPlate}
            onChange={(e) => onEngineersPlate(e.currentTarget.checked)}
          />
          <span class={styles.tickBox} aria-hidden>
            {engineersPlate && (
              <span class={styles.tick}>
                <GiCheckMark />
              </span>
            )}
          </span>
          <span class={styles.viewName}>The Engineer's Plate</span>
          <span class={styles.leader} aria-hidden />
          <span class={styles.viewNote}>Served schematic</span>
        </label>
        <Guide />
        <p class={styles.menuFoot}>one player · three balls per game</p>
      </div>
    </div>
  );
}

/** How to play: keys, or on a touch screen what to touch */
function Guide() {
  return (
    <section class={styles.guide} aria-labelledby="guide-title">
      <h3 id="guide-title" class={styles.guideTitle}>
        How to play
      </h3>
      <dl class={styles.guideList}>
        <div class={styles.guideRow}>
          <dt>Flip</dt>
          <span class={styles.leader} aria-hidden />
          <dd>
            <span class={styles.forKeys}>
              <kbd>←</kbd> <kbd>→</kbd> or <kbd>A</kbd> <kbd>D</kbd>
            </span>
            <span class={styles.forTouch}>touch the left or right half</span>
          </dd>
        </div>
        <div class={styles.guideRow}>
          <dt>Launch</dt>
          <span class={styles.leader} aria-hidden />
          <dd>
            <span class={styles.forKeys}>
              hold <kbd>Space</kbd>, and let go
            </span>
            <span class={styles.forTouch}>hold with the ball on the plunger, and let go</span>
          </dd>
        </div>
        <div class={`${styles.guideRow} ${styles.forKeys}`}>
          <dt>Nudge</dt>
          <span class={styles.leader} aria-hidden />
          <dd>
            left or right <kbd>Shift</kbd> · too hard, and it tilts
          </dd>
        </div>
      </dl>
    </section>
  );
}
