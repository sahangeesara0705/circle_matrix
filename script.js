let circleMatrix = (function (){
    'use strict';
    
    const DEFAULTS = {
        matrixWidth: 11,
        matrixHeight: 11,
        offColor: "#eeeeee",
        onColor: "#cccccc",
        circleSize: 10,
    };
    
    function createInstance(el, userOptions) {
        let options = {...DEFAULTS, ...userOptions};
        
        let matrixState = Array.from({ length: options.matrixHeight }, () => Array(options.matrixWidth).fill(0));
        
        function createMatrixHtml() {
            let html = "";
            for(let i=0;i<matrixState.length;i++) {
                html += `<div class="row" data-i="${i}">`;
                for(let j=0;j<matrixState[i].length;j++) {
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
            //console.log(matrixState);
        }
        
        function changeRow(i, state) {
            for(let j=0;j<matrixState[i].length;j++) {
                matrixState[i][j] = state;
            }
        }
        
        function changeColumn(i, state) {
            for(let j=0;j<matrixState.length;j++) {
                matrixState[j][i] = state;
            }
        }
        
        function changeMatrix(arr) {
            for(let i=0;i<matrixState.length;i++) {
                for(let j=0;j<matrixState[i].length;j++) {
                    matrixState[i][j] = arr[i][j];
                }
            }
        }
        
        function changeAll(state) {
            for(let i=0;i<matrixState.length;i++) {
                for(let j=0;j<matrixState[i].length;j++) {
                    matrixState[i][j] = state;
                }
            }
        }
        
        return { render, changeOne, changeRow, changeColumn, changeMatrix, changeAll };
    }
    
    function init(element, options) {
        let el = typeof element === 'string' ? document.querySelector(element) : element;
        if(!el) {
            console.warn("circleMatrix.init: element not found");
            return null;
        }
        el.classList.add("circle-matrix");
        return createInstance(el, options || {});
    }
    
    return { init };
})();

const circleMatrixInstance1 = circleMatrix.init(document.getElementById("circle-matrix"), { onColor: "blue", circleSize: 8 });
const circleMatrixInstance2 = circleMatrix.init(document.getElementById("circle-matrix-2"), { onColor: "#000", circleSize: 20 });
circleMatrixInstance1.render();
circleMatrixInstance2.render();

setTimeout(function() {
    circleMatrixInstance1.changeOne(1,1,1);
    circleMatrixInstance1.render();
}, 1000);

setTimeout(function() {
    circleMatrixInstance1.changeRow(1,1);
    circleMatrixInstance1.render();
}, 2000);

setTimeout(function() {
    let i = 0;
    let animation = setInterval(function() {
        if(i<10) {
            circleMatrixInstance1.changeColumn(i,1);
            circleMatrixInstance1.render();
            i++;
        } else {
            circleMatrixInstance1.changeAll(0);
            circleMatrixInstance1.render();
            clearInterval(animation);
        }
    }, 100);
}, 3000);

/*setTimeout(function() {
    circleMatrixInstance1.changeMatrix(circlematrix_11x11["S"]);
    circleMatrixInstance1.render();
}, 6000);

setTimeout(function() {
    cornerFillAnimation(circleMatrixInstance2, 11, 1, 0);
}, 2000);

setTimeout(function() {
    cornerFillAnimation(circleMatrixInstance2, 11, 0, 0);
}, 4000);

setTimeout(function() {
    sideFillAnimation(circleMatrixInstance2, 11, 1, 3);
}, 6000);

setTimeout(function() {
    sideFillAnimation(circleMatrixInstance2, 11, 0, 3);
}, 8000);

setTimeout(function() {
    circleMatrixInstance2.changeMatrix(circlematrix_11x11["S"]);
    circleMatrixInstance2.render();
}, 10000);*/

setTimeout(function() {
    squareFillAnimation(circleMatrixInstance2, 11, 1);
}, 1000);

function cornerFillAnimation(instance, size, value, start) {
    let count = 0;
    let animationCircleCount = 0;
    let animationHalfCount = size;
    let animation = setInterval(function() {
        if(animationCircleCount>=0 && animationCircleCount<animationHalfCount) {
            for(let i=0;i<animationCircleCount+1;i++) {
                if(start == 0) {
                    instance.changeOne(0+i,animationCircleCount-i,value);
                } else if(start==1) {
                    instance.changeOne(0+i,animationHalfCount-animationCircleCount+i-1,value);
                } else if(start==2) {
                    instance.changeOne(animationHalfCount-i-1,animationHalfCount-animationCircleCount+i-1,value);
                } else if(start==3) {
                    instance.changeOne(animationHalfCount-i-1,animationCircleCount-i,value);
                }
            }
        } else if(animationCircleCount>=animationHalfCount && animationCircleCount<animationHalfCount*2) {
            for(let i=animationCircleCount+1;i<animationHalfCount*2;i++) {
                if(start == 0) {
                    instance.changeOne(i-animationHalfCount,animationCircleCount+animationHalfCount-i,value);
                } else if(start==1) {
                    instance.changeOne(i-animationHalfCount,i-animationCircleCount-1,value);
                } else if(start == 2) {
                    instance.changeOne(i-animationCircleCount-1,animationHalfCount*2-i-1,value);
                } else if(start==3) {
                    instance.changeOne(i-animationCircleCount-1,i-animationHalfCount,value);
                }
            }
        } else {
            clearInterval(animation);
        }
        animationCircleCount++;
        instance.render();
    }, 50);
}

function sideFillAnimation(instance, size, value, start) {
    let animationCount = 0;
    let animation = setInterval(function() {
        if(animationCount<size) {
            for(let i=0;i<size;i++) {
                if(start==0) {
                    instance.changeOne(animationCount,i,value);
                } else if(start==1) {
                    instance.changeOne(i,size-animationCount-1,value);
                } else if(start==2) {
                    instance.changeOne(size-animationCount-1,i,value);
                } else if(start==3) {
                    instance.changeOne(i,animationCount,value);
                }
            }
        } else {
            clearInterval(animation);
        }
        animationCount++;
        instance.render();
        //console.log("animation running");
    }, 50);
}

function randomFillAnimation(instance, size, value, count) {
    let animationCount = 0;
    let animationArr = [];
    function randomNum() {
        return Math.floor(Math.random()*count);
    }
    for(let i=0;i<size;i++) {
        let innerAnimationArr = [];
        for(let j=0;j<size;j++) {
            innerAnimationArr.push(randomNum());
        }
        animationArr.push(innerAnimationArr);
    }
    let animation = setInterval(function() {
        if(animationCount<count) {
            for(let i=0;i<animationArr.length;i++) {
                for(let j=0;j<animationArr[i].length;j++) {
                    if(animationCount == animationArr[i][j]) {
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

function squareFillAnimation(instance, size, value) {
    let center = Math.floor(size/2);
    let animationCount = 0;
    let animation = setInterval(function() {
        for(let i=0;i<animationCount*2+1;i++) {
            instance.changeOne(center-animationCount,center-animationCount+i,value);
            instance.changeOne(center-animationCount+i,center+animationCount,value);
            instance.changeOne(center+animationCount,center-animationCount+i,value);
            instance.changeOne(center-animationCount+i,center-animationCount,value);
        }
        instance.render();
        animationCount++;
    }, 1000);
}
