/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** svg user units per metre */
export const UNIT_PER_METER = 40;

/** from a table drawing's units to physics: metres, y up */
export const SVG_TO_WORLD = new DOMMatrix().scale(1 / UNIT_PER_METER, -1 / UNIT_PER_METER);

/** how far the plunger pulls back, in metres */
export const PLUNGER_POWER = 0.1;

/** impulse a bumper gives the ball, in N s */
export const BUMPER_BOUNCE = 0.008;
/** impulse a kicker gives the ball, in N s */
export const KICKER_BOUNCE = 0.01;
/** impulse a slingshot adds to the ball's own bounce, in N s */
export const SLINGSHOT_BOUNCE = 0.008;

export const FLIPPER_DENSITY = 3;
/** flipper motor speed, in rad/s */
export const FLIPPER_SPEED = 15;
/** flipper motor torque, in N m */
export const FLIPPER_TORQUE = 1;
/** how far a flipper swings, in radians */
export const FLIPPER_SWING = 0.9;

/** how long a saucer holds the ball, in seconds */
export const SAUCER_HOLD = 1.2;
/** how fast a saucer or lock kicks the ball out, in m/s */
export const SAUCER_EJECT = 1.1;

/** a magnet's on-off cycle, in seconds */
export const MAGNET_CYCLE = 6;
/** how long a magnet is on in each cycle, in seconds */
export const MAGNET_ON = 1.6;
/** a magnet's pull at its edge, in N */
export const MAGNET_PULL = 0.012;

/** a disc's spin, in rad/s */
export const DISC_SPEED = 2.4;
/** how strongly a disc drags the ball along, per second */
export const DISC_GRIP = 3;

/** spinner speed gained per m/s of the ball, in half turns/s */
export const SPINNER_TAKE = 5;
/** how fast a spinner slows down, per second */
export const SPINNER_FRICTION = 0.9;

/** a nudge's impulse on each ball, in N s */
export const NUDGE_IMPULSE = 0.0008;
/** what each nudge adds to the tilt meter */
export const TILT_PER_NUDGE = 1;
/** how much the tilt meter drains per second */
export const TILT_DECAY = 0.4;
/** the tilt meter level past which the table tilts */
export const TILT_LIMIT = 3.2;

export const BALLS_PER_GAME = 3;
/** seconds after a serve during which a drained ball is given back */
export const BALL_SAVE = 10;
/** locked balls needed for multiball, unless the lock sets data-locks */
export const DEFAULT_LOCKS = 2;

/** points for completing a group: all its rollovers lit, targets hit, or drop targets down */
export const GROUP_BONUS = 2500;
/** points for a ramp shot during multiball */
export const JACKPOT = 10000;
