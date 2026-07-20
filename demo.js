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
