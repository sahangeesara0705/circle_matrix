/**
 * demo.js
 * --------
 * Example usage of circle-matrix.js + circle-matrix-fill-animations.js +
 * circlematrix_11x11.js together. This is NOT part of the library — it's
 * a demo sequence split out so the library files stay reusable on their
 * own. One instance per core method, matching the sections in index.html.
 *
 * Load order (see index.html):
 *   1. circle-matrix.js
 *   2. circle-matrix-fill-animations.js
 *   3. circlematrix_11x11.js
 *   4. demo.js
 */

// .init() + .render() — create an instance and draw it for the first time.
const circleMatrixInstance1 = circleMatrix.init(
    document.getElementById("circle-matrix-1"),
    {
        onColor: "blue",
        circleSize: 8
    }
);
circleMatrixInstance1.render();

// .changeOne(i, j, state) — set a single cell by row/column.
const circleMatrixInstance2 = circleMatrix.init(
    document.getElementById("circle-matrix-2"),
    {
        onColor: "blue",
        circleSize: 8
    }
);
circleMatrixInstance2.changeOne(1, 1, 1);
circleMatrixInstance2.render();

// .changeRow(i, state) and .changeColumn(j, state) — set a whole row or column at once.
const circleMatrixInstance3 = circleMatrix.init(
    document.getElementById("circle-matrix-3"),
    {
        onColor: "blue",
        circleSize: 8
    }
);
circleMatrixInstance3.changeRow(1, 1);
circleMatrixInstance3.changeColumn(1, 1);
circleMatrixInstance3.render();

// .changeMatrix(arr) — replace the whole grid in one call, e.g. with a glyph
// from circlematrix_11x11.js.
const circleMatrixInstance4 = circleMatrix.init(
    document.getElementById("circle-matrix-4"),
    {
        onColor: "blue",
        circleSize: 8
    }
);
circleMatrixInstance4.changeMatrix(getCircleMatrixGlyph("C"));
circleMatrixInstance4.render();

// .changeAll(state) — set every cell to the same state in one call.
const circleMatrixInstance5 = circleMatrix.init(
    document.getElementById("circle-matrix-5"),
    {
        onColor: "blue",
        circleSize: 8
    }
);
circleMatrixInstance5.changeAll(1);
circleMatrixInstance5.render();

// .getState() — read back a copy of the current grid, e.g. to inspect or save it.
const circleMatrixInstance6 = circleMatrix.init(
    document.getElementById("circle-matrix-6"),
    {
        onColor: "blue",
        circleSize: 8
    }
);
circleMatrixInstance6.changeOne(0, 0, 1);
circleMatrixInstance6.changeOne(10, 10, 1);
circleMatrixInstance6.render();
document.getElementById("circle-matrix-6-state").textContent = JSON.stringify(circleMatrixInstance6.getState());

// circleMatrixFillAnimations.sideFill(instance, size, value, start) — sweeps a
// full row/column across the grid, one line at a time. start picks the edge (0-3).
const circleMatrixInstance7 = circleMatrix.init(
    document.getElementById("circle-matrix-7"),
    { onColor: "black" }
);
circleMatrixInstance7.render();
let btnCm7Fill1 = document.getElementById("cm7-fill-1");
let btnCm7Fill0 = document.getElementById("cm7-fill-0");
btnCm7Fill1.addEventListener("click", function() {
    circleMatrixFillAnimations.sideFill(circleMatrixInstance7, 11, 1, 0);
});
btnCm7Fill0.addEventListener("click", function() {
    circleMatrixFillAnimations.sideFill(circleMatrixInstance7, 11, 0, 0);
});

// circleMatrixFillAnimations.cornerFill(instance, size, value, start) — fills
// in an expanding diagonal sweep from a corner. start picks the corner (0-3).
const circleMatrixInstance8 = circleMatrix.init(
    document.getElementById("circle-matrix-8"),
    { onColor: "black" }
);
circleMatrixInstance8.render();
let btnCm8Fill1 = document.getElementById("cm8-fill-1");
let btnCm8Fill0 = document.getElementById("cm8-fill-0");
btnCm8Fill1.addEventListener("click", function() {
    circleMatrixFillAnimations.cornerFill(circleMatrixInstance8, 11, 1, 0);
});
btnCm8Fill0.addEventListener("click", function() {
    circleMatrixFillAnimations.cornerFill(circleMatrixInstance8, 11, 0, 0);
});

// circleMatrixFillAnimations.randomFill(instance, size, value, count) — fills
// random cells over `count` ticks, so the grid fills in unevenly.
const circleMatrixInstance9 = circleMatrix.init(
    document.getElementById("circle-matrix-9"),
    { onColor: "black" }
);
circleMatrixInstance9.render();
let btnCm9Fill1 = document.getElementById("cm9-fill-1");
let btnCm9Fill0 = document.getElementById("cm9-fill-0");
btnCm9Fill1.addEventListener("click", function() {
    circleMatrixFillAnimations.randomFill(circleMatrixInstance9, 11, 1, 40);
});
btnCm9Fill0.addEventListener("click", function() {
    circleMatrixFillAnimations.randomFill(circleMatrixInstance9, 11, 0, 40);
});

// circleMatrixFillAnimations.squareFill(instance, size, value) — fills from
// the center outward in expanding square rings. No `start` param — it's
// always center-out.
const circleMatrixInstance10 = circleMatrix.init(
    document.getElementById("circle-matrix-10"),
    { onColor: "black" }
);
circleMatrixInstance10.render();
let btnCm10Fill1 = document.getElementById("cm10-fill-1");
let btnCm10Fill0 = document.getElementById("cm10-fill-0");
btnCm10Fill1.addEventListener("click", function() {
    circleMatrixFillAnimations.squareFill(circleMatrixInstance10, 11, 1);
});
btnCm10Fill0.addEventListener("click", function() {
    circleMatrixFillAnimations.squareFill(circleMatrixInstance10, 11, 0);
});
