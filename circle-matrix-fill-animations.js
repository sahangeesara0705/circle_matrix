/**
 * circle-matrix-fill-animations.js
 * ----------------------------------
 * Fill/reveal animation helpers for a circle-matrix instance (see
 * circle-matrix.js). Each function only relies on the instance's public
 * API (changeOne / render), so it works with any circleMatrix instance
 * regardless of size.
 *
 * Usage:
 *   circleMatrixFillAnimations.squareFill(instance, 11, 1);
 *   circleMatrixFillAnimations.cornerFill(instance, 11, 1, 0);
 *   circleMatrixFillAnimations.sideFill(instance, 11, 1, 3);
 *   circleMatrixFillAnimations.randomFill(instance, 11, 1, 40);
 */
let circleMatrixFillAnimations = (function () {
    'use strict';

    /**
     * Fills the grid corner-by-corner in an expanding diagonal sweep.
     * @param {object} instance - a circleMatrix instance
     * @param {number} size - grid width/height (assumes square grid)
     * @param {0|1} value - state to set each cell to
     * @param {0|1|2|3} start - which corner to start from
     */
    function cornerFillAnimation(instance, size, value, start) {
        let animationCircleCount = 0;
        let animationHalfCount = size;
        let animation = setInterval(function () {
            if (animationCircleCount >= 0 && animationCircleCount < animationHalfCount) {
                for (let i = 0; i < animationCircleCount + 1; i++) {
                    if (start == 0) {
                        instance.changeOne(0 + i, animationCircleCount - i, value);
                    } else if (start == 1) {
                        instance.changeOne(0 + i, animationHalfCount - animationCircleCount + i - 1, value);
                    } else if (start == 2) {
                        instance.changeOne(animationHalfCount - i - 1, animationHalfCount - animationCircleCount + i - 1, value);
                    } else if (start == 3) {
                        instance.changeOne(animationHalfCount - i - 1, animationCircleCount - i, value);
                    }
                }
            } else if (animationCircleCount >= animationHalfCount && animationCircleCount < animationHalfCount * 2) {
                for (let i = animationCircleCount + 1; i < animationHalfCount * 2; i++) {
                    if (start == 0) {
                        instance.changeOne(i - animationHalfCount, animationCircleCount + animationHalfCount - i, value);
                    } else if (start == 1) {
                        instance.changeOne(i - animationHalfCount, i - animationCircleCount - 1, value);
                    } else if (start == 2) {
                        instance.changeOne(i - animationCircleCount - 1, animationHalfCount * 2 - i - 1, value);
                    } else if (start == 3) {
                        instance.changeOne(i - animationCircleCount - 1, i - animationHalfCount, value);
                    }
                }
            } else {
                clearInterval(animation);
            }
            animationCircleCount++;
            instance.render();
        }, 50);
    }

    /**
     * Sweeps a full row or column across the grid, one line at a time.
     * @param {object} instance - a circleMatrix instance
     * @param {number} size - grid width/height (assumes square grid)
     * @param {0|1} value - state to set each cell to
     * @param {0|1|2|3} start - which edge to sweep from
     */
    function sideFillAnimation(instance, size, value, start) {
        let animationCount = 0;
        let animation = setInterval(function () {
            if (animationCount < size) {
                for (let i = 0; i < size; i++) {
                    if (start == 0) {
                        instance.changeOne(animationCount, i, value);
                    } else if (start == 1) {
                        instance.changeOne(i, size - animationCount - 1, value);
                    } else if (start == 2) {
                        instance.changeOne(size - animationCount - 1, i, value);
                    } else if (start == 3) {
                        instance.changeOne(i, animationCount, value);
                    }
                }
            } else {
                clearInterval(animation);
            }
            animationCount++;
            instance.render();
        }, 50);
    }

    /**
     * Fills random cells over `count` ticks, so the grid fills in unevenly.
     * @param {object} instance - a circleMatrix instance
     * @param {number} size - grid width/height (assumes square grid)
     * @param {0|1} value - state to set each cell to
     * @param {number} count - number of animation ticks to spread the fill over
     */
    function randomFillAnimation(instance, size, value, count) {
        let animationCount = 0;
        let animationArr = [];
        function randomNum() {
            return Math.floor(Math.random() * count);
        }
        for (let i = 0; i < size; i++) {
            let innerAnimationArr = [];
            for (let j = 0; j < size; j++) {
                innerAnimationArr.push(randomNum());
            }
            animationArr.push(innerAnimationArr);
        }
        let animation = setInterval(function () {
            if (animationCount < count) {
                for (let i = 0; i < animationArr.length; i++) {
                    for (let j = 0; j < animationArr[i].length; j++) {
                        if (animationCount == animationArr[i][j]) {
                            instance.changeOne(i, j, value);
                        }
                    }
                }
            } else {
                clearInterval(animation);
            }
            instance.render();
            animationCount++;
        }, 50);
    }

    /**
     * Fills the grid from the center outward in expanding square rings.
     * @param {object} instance - a circleMatrix instance
     * @param {number} size - grid width/height (assumes square grid)
     * @param {0|1} value - state to set each cell to
     */
    function squareFillAnimation(instance, size, value) {
        let center = Math.floor(size / 2);
        let animationCount = 0;
        let animation = setInterval(function () {
            for (let i = 0; i < animationCount * 2 + 1; i++) {
                instance.changeOne(center - animationCount, center - animationCount + i, value);
                instance.changeOne(center - animationCount + i, center + animationCount, value);
                instance.changeOne(center + animationCount, center - animationCount + i, value);
                instance.changeOne(center - animationCount + i, center - animationCount, value);
            }
            instance.render();
            animationCount++;
            if (animationCount * 2 + 1 > size * 2) {
                clearInterval(animation);
            }
        }, 1000);
    }

    return {
        cornerFill: cornerFillAnimation,
        sideFill: sideFillAnimation,
        randomFill: randomFillAnimation,
        squareFill: squareFillAnimation,
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = circleMatrixFillAnimations;
}
