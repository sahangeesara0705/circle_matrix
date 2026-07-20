# circle-matrix

A small vanilla-JS library for rendering an NxM grid of circular "pixels" and animating them. Split into three independent files plus a demo.

## Files

| File | Purpose |
|---|---|
| `circle-matrix.js` | Core library. Renders the grid, exposes mutation methods. No dependencies. |
| `circle-matrix-fill-animations.js` | Optional fill/reveal animations (corner, side, random, square). Depends only on a circleMatrix instance's public methods — works with any instance. |
| `circlematrix_11x11.js` | Optional 11x11 bitmap font (0-9, A-Z, a-z) for displaying characters on an 11x11 grid via `changeMatrix`. |
| `demo.js` / `index.html` | Example usage — not part of the library. |

Load `circle-matrix.js` first; the other two are independent of each other and only need to load before whatever code uses them.

## Core API — `circle-matrix.js`

```js
const instance = circleMatrix.init(elementOrSelector, {
    matrixWidth: 11,     // default 11
    matrixHeight: 11,    // default 11
    offColor: "#eeeeee", // default
    onColor: "#cccccc",  // default
    circleSize: 10,       // px, default 10
});

instance.render();                 // (re)draw the grid into the element
instance.changeOne(i, j, state);   // set a single cell (state: 0 or 1)
instance.changeRow(i, state);      // set an entire row
instance.changeColumn(j, state);   // set an entire column
instance.changeMatrix(arr);        // replace the whole grid with a 2D array
instance.changeAll(state);         // set every cell to the same state
instance.getState();               // returns a copy of the current grid
```

`render()` is never called automatically — call it after any `change*` call to reflect the update in the DOM. This lets you batch several changes before a single repaint.

## Fill animations — `circle-matrix-fill-animations.js`

```js
circleMatrixFillAnimations.cornerFill(instance, size, value, start); // start: 0-3, which corner
circleMatrixFillAnimations.sideFill(instance, size, value, start);   // start: 0-3, which edge
circleMatrixFillAnimations.randomFill(instance, size, value, count); // count: ticks to spread fill over
circleMatrixFillAnimations.squareFill(instance, size, value);        // expands from center
```

All four call `instance.render()` internally on each tick, so you don't need to call it yourself.

## Font — `circlematrix_11x11.js`

```js
circlematrix_11x11["A"];        // raw 11x11 array, or undefined if missing
getCircleMatrixGlyph("A");      // same, but returns null + console.warn if missing
instance.changeMatrix(getCircleMatrixGlyph("A"));
instance.render();
```

## Notes on changes from the original `script.js`

- Split into separate files as described above; the demo/setup code that used to run at the bottom of `script.js` now lives in `demo.js`.
- The four animation helpers are namespaced under `circleMatrixFillAnimations` instead of being global functions, to avoid polluting the global scope.
- Fixed a bug in `squareFillAnimation`: it had no stopping condition, so it ran forever and would eventually throw once the ring expanded past the grid edges (indices going out of bounds). It now stops once the fill reaches the edge of the grid.
- Each file now also does `module.exports` if `module` exists, so they can be `require`'d in Node/bundler setups, not just loaded via `<script>` tags.
