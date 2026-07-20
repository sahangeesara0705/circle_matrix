/**
 * circle-matrix.js
 * ------------------
 * Core library: renders an NxM grid of circular "pixels" into a DOM element
 * and exposes methods to mutate individual cells, rows, columns, or the
 * whole grid at once.
 *
 * This file has no dependencies and knows nothing about animations or
 * fonts — see circle-matrix-fill-animations.js and circlematrix_11x11.js
 * for those.
 *
 * Usage:
 *   const instance = circleMatrix.init("#circle-matrix", { onColor: "blue" });
 *   instance.render();
 *   instance.changeOne(1, 1, 1);
 *   instance.render();
 */
let circleMatrix = (function () {
    'use strict';

    const DEFAULTS = {
        matrixWidth: 11,
        matrixHeight: 11,
        offColor: "#eeeeee",
        onColor: "#cccccc",
        circleSize: 10,
    };

    function createInstance(el, userOptions) {
        let options = { ...DEFAULTS, ...userOptions };

        let matrixState = Array.from({ length: options.matrixHeight }, () => Array(options.matrixWidth).fill(0));

        function createMatrixHtml() {
            let html = "";
            for (let i = 0; i < matrixState.length; i++) {
                html += `<div class="row" data-i="${i}">`;
                for (let j = 0; j < matrixState[i].length; j++) {
                    html += `<div
                    style="
                    background-color: ${matrixState[i][j] ? options.onColor : options.offColor};
                    width: ${options.circleSize}px;
                    height: ${options.circleSize}px;
                    border-radius: ${options.circleSize / 2}px;
                    "
                    class="cell ${matrixState[i][j] ? 'active' : ''}"
                    data-i="${i}"
                    data-j="${j}"></div>`;
                }
                html += `</div>`;
            }
            return html;
        }

        function render() {
            let html = createMatrixHtml();
            el.innerHTML = html;
        }

        function changeOne(i, j, state) {
            matrixState[i][j] = state;
        }

        function changeRow(i, state) {
            for (let j = 0; j < matrixState[i].length; j++) {
                matrixState[i][j] = state;
            }
        }

        function changeColumn(i, state) {
            for (let j = 0; j < matrixState.length; j++) {
                matrixState[j][i] = state;
            }
        }

        function changeMatrix(arr) {
            for (let i = 0; i < matrixState.length; i++) {
                for (let j = 0; j < matrixState[i].length; j++) {
                    matrixState[i][j] = arr[i][j];
                }
            }
        }

        function changeAll(state) {
            for (let i = 0; i < matrixState.length; i++) {
                for (let j = 0; j < matrixState[i].length; j++) {
                    matrixState[i][j] = state;
                }
            }
        }

        function getState() {
            return matrixState.map(row => row.slice());
        }

        return { render, changeOne, changeRow, changeColumn, changeMatrix, changeAll, getState };
    }

    function init(element, options) {
        let el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) {
            console.warn("circleMatrix.init: element not found");
            return null;
        }
        el.classList.add("circle-matrix");
        return createInstance(el, options || {});
    }

    return { init };
})();

// UMD-style export so this file also works with `require`/bundlers, not just <script> tags.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = circleMatrix;
}
