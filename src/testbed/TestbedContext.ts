import * as Stage from "stage-js";
import { type World } from "planck";

export interface ContextSimulation {
  speed: number;
  hz: number;
}

export interface ContextStyle {
  stroke?: string;
  fill?: string;
  lineWidth?: number;
  background?: string;
}

export interface Camera {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TestbedContext {
  paused: boolean;
  pointerCaptured: boolean;

  world: World;

  style: ContextStyle;
  simulation: ContextSimulation;
  camera: Camera;

  containerElement?: HTMLElement;

  stage: Stage.Root;
}

export class DefaultTestbedContext implements TestbedContext {
  paused = false;
  pointerCaptured = false;
  world: World;
  style = {
    background: "#111",
  };
  simulation = {
    speed: 1,
    hz: 60,
  };
  camera = {
    x: 0,
    y: -10,
    width: 80,
    height: 60,
  };
  containerElement?: HTMLElement;
  stage: Stage.Root;
}
