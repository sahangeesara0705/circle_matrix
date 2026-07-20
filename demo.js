/**
 * demo.js
 * --------
 * Example usage of circle-matrix.js + circle-matrix-fill-animations.js +
 * circlematrix_11x11.js together. This is NOT part of the library — it's
 * the same demo sequence from the original script.js, split out so the
 * library files stay reusable on their own.
 *
 * Load order (see index.html):
 *   1. circle-matrix.js
 *   2. circle-matrix-fill-animations.js
 *   3. circlematrix_11x11.js
 *   4. demo.js
 */
const circleMatrixInstance1 = circleMatrix.init(document.getElementById("circle-matrix"), { onColor: "blue", circleSize: 8 });
const circleMatrixInstance2 = circleMatrix.init(document.getElementById("circle-matrix-2"), { onColor: "#000", circleSize: 20 });
circleMatrixInstance1.render();
circleMatrixInstance2.render();

setTimeout(function () {
    circleMatrixInstance1.changeOne(1, 1, 1);
    circleMatrixInstance1.render();
}, 1000);

setTimeout(function () {
    circleMatrixInstance1.changeRow(1, 1);
    circleMatrixInstance1.render();
}, 2000);

setTimeout(function () {
    let i = 0;
    let animation = setInterval(function () {
        if (i < 10) {
            circleMatrixInstance1.changeColumn(i, 1);
            circleMatrixInstance1.render();
            i++;
        } else {
            circleMatrixInstance1.changeAll(0);
            circleMatrixInstance1.render();
            clearInterval(animation);
        }
    }, 100);
}, 3000);

setTimeout(function () {
    circleMatrixInstance1.changeMatrix(getCircleMatrixGlyph("S"));
    circleMatrixInstance1.render();
}, 6000);

setTimeout(function () {
    circleMatrixFillAnimations.cornerFill(circleMatrixInstance2, 11, 1, 0);
}, 2000);

setTimeout(function () {
    circleMatrixFillAnimations.cornerFill(circleMatrixInstance2, 11, 0, 0);
}, 4000);

setTimeout(function () {
    circleMatrixFillAnimations.sideFill(circleMatrixInstance2, 11, 1, 3);
}, 6000);

setTimeout(function () {
    circleMatrixFillAnimations.sideFill(circleMatrixInstance2, 11, 0, 3);
}, 8000);

setTimeout(function () {
    circleMatrixInstance2.changeMatrix(getCircleMatrixGlyph("S"));
    circleMatrixInstance2.render();
}, 10000);

setTimeout(function () {
    circleMatrixFillAnimations.squareFill(circleMatrixInstance2, 11, 1);
}, 12000);
