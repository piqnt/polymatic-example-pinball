import { Middleware } from "polymatic";
import { MainContext } from "./Main";

export interface PointerInfo {
  pointerId: number;
  type: string;
  x: number;
  y: number;
  side: "left" | "right";
}

/**
 * PointerManager handles pointer (mouse/touch) events and stores pointers data in context.
 */
export class PointerManager extends Middleware<MainContext> {
  isTouchDevice: boolean;

  constructor(element = window) {
    super();
    this.on("activate", this.handleActivate);
    this.on("deactivate", this.handleDeactivate);
  }

  handleActivate() {
    this.isTouchDevice = "ontouchstart" in window;

    if (window.PointerEvent) {
      window.addEventListener("pointerdown", this.handleStart, { passive: false });
      window.addEventListener("pointermove", this.handleMove, { passive: false });
      window.addEventListener("pointerup", this.handleEnd, { passive: true });
      window.addEventListener("pointercancel", this.handleEnd, { passive: true });
    } else {
      window.addEventListener("touchstart", this.handleStart, { passive: false });
      window.addEventListener("touchmove", this.handleMove, { passive: false });
      window.addEventListener("touchend", this.handleEnd, { passive: true });
      window.addEventListener("touchcancel", this.handleEnd, { passive: true });

      window.addEventListener("mousedown", this.handleStart, { passive: false });
      window.addEventListener("mousemove", this.handleMove, { passive: false });
      window.addEventListener("mouseup", this.handleEnd, { passive: true });
      window.addEventListener("mouseleave", this.handleEnd, { passive: true });
    }
  }

  handleDeactivate = () => {
    window.removeEventListener("pointerdown", this.handleStart);
    window.removeEventListener("pointermove", this.handleMove);
    window.removeEventListener("pointerup", this.handleEnd);
    window.removeEventListener("pointercancel", this.handleEnd);

    window.removeEventListener("touchstart", this.handleStart);
    window.removeEventListener("touchmove", this.handleMove);
    window.removeEventListener("touchend", this.handleEnd);
    window.removeEventListener("touchcancel", this.handleEnd);

    window.removeEventListener("mousedown", this.handleStart);
    window.removeEventListener("mousemove", this.handleMove);
    window.removeEventListener("mouseup", this.handleEnd);
    window.removeEventListener("mouseleave", this.handleEnd);
    this.context.activePointers.clear();
  };

  getSide(x) {
    const viewportWidth = window.innerWidth;
    return x < viewportWidth / 2 ? "left" : "right";
  }

  handleStart = (event: PointerEvent | TouchEvent | MouseEvent) => {
    event.preventDefault();

    const touchEvent = event as TouchEvent;
    const touches = touchEvent.touches || [event as PointerEvent | MouseEvent];

    for (const e of touches) {
      const touch = e as Touch;
      const point = e as PointerEvent;

      const pointer: PointerInfo = {
        pointerId: touch.identifier ?? point.pointerId,
        type: point.pointerType || (this.isTouchDevice ? "touch" : "mouse"),
        x: e.clientX,
        y: e.clientY,
        side: this.getSide(e.clientX),
      };

      this.context.activePointers.set(pointer.pointerId, pointer);

      this.emit("pointer-start", pointer);
    }
  };

  handleMove = (event: PointerEvent | TouchEvent | MouseEvent) => {
    event.preventDefault();

    const touchEvent = event as TouchEvent;
    const touches = touchEvent.touches || [event as PointerEvent | MouseEvent];

    for (const e of touches) {
      const touch = e as Touch;
      const point = e as PointerEvent;
      const id = touch.identifier ?? point.pointerId;
      const pointer = this.context.activePointers.get(id);
      if (!pointer) continue;
      const newSide = this.getSide(point.clientX);
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.side = newSide;
      this.emit("pointer-move", pointer);
    }
  };

  handleEnd = (event: PointerEvent | TouchEvent | MouseEvent) => {
    const touchEvent = event as TouchEvent;
    const pointerEvent = event as PointerEvent;

    const touches = touchEvent.touches || [];

    const endedIds = new Set<number>();
    if (pointerEvent.pointerId !== undefined) {
      // pointerup / pointercancel gives one pointer
      endedIds.add(pointerEvent.pointerId);
    } else if (touchEvent.changedTouches) {
      // touchend gives remaining active touches, ended one is not in list
      for (const t of touchEvent.changedTouches) {
        endedIds.add(t.identifier);
      }
    }

    for (const id of endedIds) {
      const pointer = this.context.activePointers.get(id);
      if (!pointer) continue;

      this.context.activePointers.delete(id);

      this.emit("pointer-end", pointer);
    }
  };
}
