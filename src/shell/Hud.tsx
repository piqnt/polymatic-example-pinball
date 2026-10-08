/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from "preact/hooks";
import { TbChevronDown } from "react-icons/tb";

import { type Callout } from "../model";
import { useCurrentTable, useRuntime } from "./context";
import { isFirstVisit, markMenuSeen, TableMenu } from "./TableMenu";
import { GameOver } from "./GameOver";
import { PlateDefs, useEngineersPlate } from "./EngineersPlate";
import styles from "./Shell.module.css";

/**
 * A bar over the table: the score, the table's name, and the balls. The name
 * opens the table menu, and callouts show in its place for a moment.
 */
export function Hud() {
  const { hud } = useRuntime().context;
  useTableWidth();
  const [engineersPlate, setEngineersPlate] = useEngineersPlate();
  useTableColor(engineersPlate);
  // on a first visit, the menu is open with no table chosen yet
  const [firstVisit] = useState(isFirstVisit);
  const [menuOpen, setMenuOpen] = useState(firstVisit);
  const [chosen, setChosen] = useState(!firstVisit);
  return (
    <>
      <div class={`${styles.bar} ${hud.tilted.value ? styles.tilted : ""}`}>
        <Score />
        <TableButton onOpen={() => setMenuOpen(true)} />
        <Balls />
      </div>
      {menuOpen && (
        <TableMenu
          chosen={chosen}
          engineersPlate={engineersPlate}
          onEngineersPlate={setEngineersPlate}
          onClose={() => {
            markMenuSeen();
            setMenuOpen(false);
            setChosen(true);
          }}
        />
      )}
      <Announce />
      <GameOver onTables={() => setMenuOpen(true)} />
      <PlateDefs />
    </>
  );
}

/** the table's width, frame included, as --table-width, so the bar can match it */
function useTableWidth() {
  useEffect(() => {
    const table = document.getElementById("table");
    if (!table) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      root.style.setProperty("--table-width", `${table.getBoundingClientRect().width}px`);
    });
    observer.observe(table);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--table-width");
    };
  }, []);
}

/** the table's colour as --table-color, for the light behind it (index.html); the plate's paper while that is on */
function useTableColor(engineersPlate: boolean) {
  const { color } = useCurrentTable();
  useEffect(() => {
    document.documentElement.style.setProperty("--table-color", engineersPlate ? "var(--paper)" : color);
  }, [color, engineersPlate]);
}

function Score() {
  const { hud } = useRuntime().context;
  return (
    <div class={styles.score}>
      <span class={styles.label}>Score</span>
      <span class={styles.number}>{hud.score.value.toLocaleString()}</span>
    </div>
  );
}

function Balls() {
  const { hud } = useRuntime().context;
  const dots = [];
  for (let i = 1; i <= hud.balls.value; i++) {
    dots.push(
      <span
        key={i}
        class={`${styles.dot} ${i < hud.ball.value ? styles.used : ""} ${i === hud.ball.value ? styles.now : ""}`}
      />,
    );
  }
  return (
    <div class={styles.balls} aria-label={`Ball ${hud.ball.value} of ${hud.balls.value}`}>
      <span class={styles.label}>Ball</span>
      <span class={styles.dots}>{dots}</span>
    </div>
  );
}

/** shown in the name's place for as long as the table is tilted */
const TILT_MESSAGE = { key: "tilt", text: "Tilt" };

/** The table's name; opens the table menu */
function TableButton({ onOpen }: { onOpen: () => void }) {
  const { hud } = useRuntime().context;
  const current = useCurrentTable();
  const message = useSlotMessage(hud.message.value, hud.score.value) ?? (hud.tilted.value ? TILT_MESSAGE : null);
  return (
    <button
      type="button"
      class={styles.current}
      aria-haspopup="dialog"
      aria-label={`${current.name}: choose a table`}
      onClick={onOpen}
    >
      {/* the name, moved aside while a message pops in over it */}
      <span class={styles.slot}>
        <span class={`${styles.slotName} ${message ? styles.away : ""}`}>
          <span class={styles.slotText}>{current.name}</span>
          <TbChevronDown aria-hidden />
        </span>
        {message && (
          <span key={message.key} class={styles.slotMessage} aria-hidden>
            {message.text}
          </span>
        )}
      </span>
    </button>
  );
}

/** how long a callout, and the points just scored, show in the name's place, in ms */
const CALLOUT_HOLD = 2000;
const GAIN_HOLD = 1500;
/** points scored within this many ms of each other are shown summed */
const GAIN_JOIN = 600;

type SlotMessage = { key: string; text: string; kind: "callout" | "gain"; points: number; last: number; until: number };

/**
 * What shows in the name's place: the latest callout, or else the points just
 * scored. Points don't replace a callout that is still showing.
 */
function useSlotMessage(callout: Callout | null, score: number) {
  const [message, setMessage] = useState<SlotMessage | null>(null);
  const previous = useRef(score);

  useEffect(() => {
    if (!callout) return;
    const now = Date.now();
    setMessage({
      key: "callout-" + callout.at,
      text: callout.text,
      kind: "callout",
      points: 0,
      last: now,
      until: now + CALLOUT_HOLD,
    });
  }, [callout?.at]);

  useEffect(() => {
    const points = score - previous.current;
    previous.current = score;
    // a new game, or a new table
    if (points <= 0) return;
    const now = Date.now();
    setMessage((shown) => {
      if (shown?.kind === "callout" && now < shown.until) return shown;
      const total = shown?.kind === "gain" && now - shown.last < GAIN_JOIN ? shown.points + points : points;
      return {
        key: "gain-" + now,
        text: "+" + total.toLocaleString(),
        kind: "gain",
        points: total,
        last: now,
        until: now + GAIN_HOLD,
      };
    });
  }, [score]);

  // the name comes back once the message has had its time
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), Math.max(0, message.until - Date.now()));
    return () => clearTimeout(timer);
  }, [message]);

  return message;
}

/** callouts, for screen readers */
function Announce() {
  const { hud } = useRuntime().context;
  return (
    <div class={styles.hidden} aria-live="polite">
      {hud.message.value?.text}
    </div>
  );
}
