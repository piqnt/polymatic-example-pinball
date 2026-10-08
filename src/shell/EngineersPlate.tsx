/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "preact/hooks";

// The Engineer's Plate: a debugging view that draws any table as its parts
// only. Its styles are in engineers-plate.css.

const STORAGE_KEY = "pinball-engineers-plate";

/** the Engineer's Plate, on or off: remembered, and shown as a class on #table */
export function useEngineersPlate() {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.getElementById("table")?.classList.toggle("engineers-plate", on);
    try {
      if (on) localStorage.setItem(STORAGE_KEY, "1");
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // not remembered, then
    }
  }, [on]);
  return [on, setOn] as const;
}

/**
 * The patterns the plate fills parts with, by id: hatching for solid parts,
 * stippling for the ball, a crosshair for a pivot. Sized in the table's units,
 * about a tenth of a ball apart. Not display:none, or some browsers won't
 * draw them.
 */
export function PlateDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <Hatch id="plate-hatch-red" ink="var(--plate-red)" />
        <Hatch id="plate-hatch-indigo" ink="var(--plate-indigo)" />
        <Hatch id="plate-hatch-ochre" ink="var(--plate-ochre)" />
        <Hatch id="plate-hatch-ink" ink="var(--ink)" />
        <pattern id="plate-dots" width="0.16" height="0.16" patternUnits="userSpaceOnUse">
          <rect width="0.16" height="0.16" style={{ fill: "var(--paper)" }} />
          <circle cx="0.04" cy="0.04" r="0.028" style={{ fill: "var(--ink)" }} />
          <circle cx="0.12" cy="0.12" r="0.028" style={{ fill: "var(--ink)" }} />
        </pattern>
        <pattern id="plate-cross" width="1" height="1" patternContentUnits="objectBoundingBox">
          <rect width="1" height="1" style={{ fill: "var(--paper)" }} />
          <path d="M 0.5,0 V 1 M 0,0.5 H 1" stroke-width="0.14" style={{ stroke: "var(--ink)" }} />
        </pattern>
      </defs>
    </svg>
  );
}

function Hatch({ id, ink }: { id: string; ink: string }) {
  return (
    <pattern id={id} width="0.22" height="0.22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="0.22" height="0.22" style={{ fill: "var(--paper)" }} />
      <line x1="0" y1="0" x2="0" y2="0.22" stroke-width="0.05" style={{ stroke: ink }} />
    </pattern>
  );
}
