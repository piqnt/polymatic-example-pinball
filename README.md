# Pinball - Polymatic Example

Pinball with tables drawn as SVG files. Implemented using:
- [Polymatic](https://github.com/piqnt/polymatic)
- [Planck.js](https://github.com/piqnt/planck.js)
- [Preact](https://preactjs.com/) and [Preact Signals](https://github.com/preactjs/signals)

[Play Live Demo](https://piqnt.github.io/polymatic-example-pinball/)

**Controls:** ← → (or A D) flip, Space (or Enter, S, ↓) pulls the plunger, left and right Shift nudge the table, too much and it tilts. On a touch screen, touch the left or right half to flip, and hold to pull the plunger while a ball is on it.

## Drawing a table

A table is an SVG file in `src/svg-table/`, and its file name is its id. Attributes on the root `<svg>` describe it for the table menu:

- `data-name`: its name.
- `data-blurb`: a line about it.
- `data-color`: the colour of the light behind it.
- `data-order`: its place in the menu; the first table is the default.

The SVG is shown as drawn. A shape's label (`inkscape:label` or `data-pinball-label`) makes it a part of the game. Shapes without a part's label are just art.

| label | shape | part |
| --- | --- | --- |
| `wall` | outline | a wall |
| `ball` | circle | where balls are served, on the plunger; balls in play are copies of it |
| `plunger` | outline | the plunger |
| `flipper-left`, `flipper-right` | outline | a flipper |
| `flipper-anchor-left`, `flipper-anchor-right` | circle | a flipper's pivot; each flipper uses the nearest one on its side |
| `drain` | outline | loses the ball |
| `bumper` | circle | a pop bumper |
| `slingshot` | outline | a slingshot |
| `kicker` | outline | a kicker |
| `post` | circle | a rubber post |
| `rollover` | either | a lane light the ball rolls over |
| `target` | either | a standup target |
| `drop-target` | outline | a target that drops when hit |
| `spinner` | outline | a flap that spins as the ball passes |
| `gate` | outline | a one-way gate |
| `saucer` | circle | holds the ball a moment, then kicks it out |
| `lock` | circle | holds the ball; enough locked balls start multiball |
| `magnet` | circle | pulls the ball in, switching on and off |
| `disc` | circle | a spinning disc that carries the ball round |
| `captive-ball` | circle | a ball kept in a channel |
| `ramp-wall` | outline | a wall on the ramps, above the playfield |
| `ramp-enter`, `ramp-exit` | outline | a ramp's ends: crossing the entrance the right way goes up onto the ramp; the exit comes back down |

An outline is a path, rect, polygon or line, with all transforms applied.

Settings are `data-` attributes on a part:

- `data-points`: what it scores.
- `data-group`: rollovers, targets or drop targets that complete together, for a bonus.
- `data-direction`: degrees clockwise from up, or `up`, `right`, `down`, `left`. Required for a gate or a ramp entrance (the way the ball may pass). For a saucer or lock, the way it kicks the ball out (default down).
- `data-locks`: on a lock, how many locked balls start multiball (default 2).

The table's own CSS draws the game's state:

- Parts get the classes `lit`, `down`, `active`, `full` and `hit`.
- Elements with `data-part="<part id>"` move and light up with that part.
- Elements with `data-light="<name>"` get `lit` while that light is on: `ball-save`, `multiball`, `tilt`, `lock-1`, `lock-2`, … for each locked ball, and `ball-1` up to the ball being played.

Balls on the playfield are drawn at the `ball` element's place in the file, so anything after it, like a ramp, covers them. Balls on a ramp are drawn on top.

**The Engineer's Plate**, on the table menu, is a debugging view: it draws any table as its parts only, in drafting-style lines, with no changes to the file (`src/shell/engineers-plate.css`).

### How to run the code

To run or build the source code in this repository you need to have node.js/npm installed.

Install this project dependencies:

```sh
npm install
```

To run the project locally:

```sh
npm run dev
```

This will print out the url where you can open the project.

To build the project for production:

```sh
npm run build
```
