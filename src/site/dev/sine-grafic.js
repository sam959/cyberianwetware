let canvas, canvasContext, theta;

const wave = {
    y: window.innerHeight / 2,
    length: 200000,
    amplitude: 50,
    speed: 0.05,
};

function numberFlow() {
    $('.number-flow').map(function () {
        let x = Math.floor((Math.random() * 2500) + 1);
        $(this).text(x)
    });
    setTimeout(numberFlow, 1000);
}

window.onload = () => {
    numberFlow()

    canvas = document.getElementById("canvas");
    canvas2 = document.getElementById("canvas2");

    canvasContext = canvas.getContext("2d");
    canvasContext2 = canvas2.getContext("2d");

    theta = 0;
    window.requestAnimationFrame(animation);
};

function drawSine(_canvas) {
    const second = {
        sx: _canvas.width / 2,
        sy: _canvas.height / 2,
        width: _canvas.width,
        getY(i) {
            return this.sy + Math.sin(i * wave.length + theta) * wave.amplitude;
        },
    };
    for (let i = 0; i < 24; i += 2) {
        plotSineSecondCanvas(i, second);
    }

    const first = {
        sx: 0,
        sy: _canvas.height / 2,
        width: _canvas.width,
        getY(i) {
            return this.sy + Math.sin(i * wave.length + theta) * wave.amplitude;
        },
    };

    for (let i = 0; i < 24; i += 2) {
        plotSineSecondCanvas(i, first);
    }
}

function drawUpAndDownSine() {
    const leftOption = {
        sx: 0,
        sy: window.innerHeight / 4,
        width: window.innerWidth / 2,
        getY(i) {
            return (
                this.sy +
                Math.sin(i * wave.length + theta) * wave.amplitude * Math.sin(theta) /** Math.sin(theta) makes it jiggle*/
            );
        },
    };

    for (let i = 0; i < 24; i += 2) {
        plotSine(i, leftOption);
    }
}

function drawMultiStatic() {
    const leftBottomOption = {
        sx: 0,
        sy: window.innerHeight - window.innerHeight / 4,
        width: window.innerWidth / 2,
        getY(i) {


            return (
                this.sy +
                Math.sin(i * wave.length * 2) * 4 * Math.sin(i * wave.length) * 20
            );
        },
    };
    plotSine(0, leftBottomOption);
}

function drawTwoStatic() {
    // NOTE+ Left down
    const leftDownOption = {
        sx: 0,
        sy: window.innerHeight / 2,
        width: window.innerWidth / 2,
        getY(i) {
            return this.sy + Math.sin(i * wave.length) * 20;
        },
    };

    plotSine(1, leftDownOption);

    // NOTE+ Right down
    const rightDownOption = {
        sx: 0,
        sy: window.innerHeight / 2,
        width: window.innerWidth / 2,
        getY(i) {

            return this.sy + Math.sin(i * wave.length * 2) * 4;
        },
    };
    plotSine(0, rightDownOption);
}

function drawSineStatic() {
    // NOTE+ Right down
    const rightDownOption2 = {
        sx: window.innerWidth / 2,
        sy: window.innerHeight / 2,
        width: window.innerWidth,
        getY(i) {
            return (this.sy) + Math.sin(i * wave.length * 2) * 4;
        },
    };
    plotSine(0, rightDownOption2);
}

function drawMulti(_canvas) {
    const rightBottomOption = {
        sx: 0,
        sy: _canvas.height - _canvas.height / 2,
        width: _canvas.width,
        getY(i) {
            return (
                this.sy +
                Math.sin(i * wave.length * 2 + theta) *
                4 *
                Math.sin(i * wave.length + theta) *
                20
            );
        },
    };
    plotSine(0, rightBottomOption);
}

function animation() {
    window.requestAnimationFrame(animation);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext2.clearRect(0, 0, canvas2.width, canvas2.height);

    //drawUpAndDownSine()
    drawMulti(canvas)
    drawSine(canvas2)

    theta += wave.speed;
}

function plotSineSecondCanvas(yOffset, opt) {
    canvasContext2.beginPath();
    canvasContext2.moveTo(yOffset + opt.sx, opt.sy);
    const alpha = map(yOffset, 0, 24, 1, 0);
    canvasContext2.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    canvasContext2.lineWidth = 1;
    // NOTE: Left waves
    for (let i = opt.sx; i < opt.width; i++) {
        canvasContext2.lineTo(i + yOffset, opt.getY(i));
    }
    canvasContext2.stroke();
}

function plotSine(yOffset, opt) {
    canvasContext.beginPath();
    canvasContext.moveTo(opt.sx + yOffset, opt.sy);
    const alpha = map(yOffset, 0, 24, 1, 0);
    canvasContext.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    canvasContext.lineWidth = 1;

    // NOTE: Left waves
    for (let i = opt.sx; i < opt.width; i++) {
        canvasContext.lineTo(i + yOffset, opt.getY(i));
    }

    canvasContext.stroke();
}

function map(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
