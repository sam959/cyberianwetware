let direction = 0.0;
let goingUp = true;
let vertexCoord;
let fillFigure = false;
let mouseClicks = 0;
let rotateCanvasOn;
let paused;
let numberOfScreenFills;

let velocitySlider, rotationSlider, sidesSlider;
let rotationButton;

function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
    background(15, 10, 4);

    vertexCoord = 0.0;
    paused = false;
    rotateCanvasOn = false;
    numberOfScreenFills = 0;
    velocitySlider = createSlider(1, 50, 10);
    velocitySlider.position(1, 20);

    rotationSlider = createSlider(0.1, 1, 1, 0.1);
    rotationSlider.position(1, 40);

    sidesSlider = createSlider(1, 70, 4);
    sidesSlider.position(1, 60);

    rotationButton = createButton("rotation");
    rotationButton.position(1, 0);
    rotationButton.mousePressed(rotateCanvas);
}

function draw() {
    //background(color%255,150, 255)
    showStats();
    listenKeyEvents();
    doColor();
    if (!paused) {

        if (vertexCoord > width / 2 && goingUp) {
            vertexCoord = 0;
        }
        if (vertexCoord === 0 && !goingUp) {
            background(5, 10, 4);
            vertexCoord = width / 2;
        }

        doBackground()

        translate(width / 2, height / 2);
        if (rotateCanvasOn) rotate(radians(frameCount * rotationSlider.value()));


        doShape(vertexCoord, velocitySlider.value(), sidesSlider.value());

        setVertexCoord();
    }
}

function doBackground() {
    /*
    if (vertexCoord == 1) {
      background(15, 10, 4);
    }
    if (!goingUp) {
      background(15, 10, 4);
    }
    */
    if(fillFigure && goingUp && vertexCoord === 0){
        background(5, 10, 4);
    } else if (vertexCoord >= width / 2) {
        background(5, 10, 4, 0.4);
        numberOfScreenFills++
    }
}

function showStats() {
    fill(200, 100, 150);
    rect(65, 0, 140, 20);

    fill(150, 100, 100);
    rect(160, 0, 220, 20);
    fill(0, 0, 255);

    let r = goingUp ? "goingUp" : "goingDown"
    text(`${r}    vertexCoord:${vertexCoord}`, 170, 10);




    text(`x: ${mouseX}    y:${mouseY}`, 70, 10);

}

function mouseClicked() {
    if (mouseX > 50 && mouseY > 150) {
        if (mouseClicks % 2 === 0) {
            fillFigure = true;
            print("fill figure");
        } else {
            fillFigure = false;
            print("fill stroke");
        }
        mouseClicks++;
    }
}

function rotateCanvas() {
    print(`rotate : ${rotateCanvasOn} `);

    rotateCanvasOn = !rotateCanvasOn;
}

function drawPoly(radius, sides) {
    for (let i = 0; i < sides; i++) {
        let angleRange = TWO_PI / sides;

        let angle = i * angleRange;
        let nextAngle = (i + 1) * angleRange;

        line(cos(angle) * radius,
            sin(angle) * radius,
            cos(nextAngle) * radius,
            sin(nextAngle) * radius);


    }
}

function drawPolyShape(radius, sides) {
    beginShape()
    for (let i = 0; i < sides; i++) {
        let angleRange = TWO_PI / sides;

        let angle = i * angleRange;
        let nextAngle = (i + 1) * angleRange;


        vertex(cos(angle) * radius, 		sin(angle) * radius)
        vertex(cos(nextAngle) * radius, 	sin(nextAngle) * radius)

        endShape()

    }
}

function doShape(coord, velocity, sides) {
    if (fillFigure) {
        beginShape();
        drawPolyShape(coord, sides)
        /*
    vertex(-coord, -coord);

    vertex(coord, -coord);

    vertex(coord, coord);

    vertex(-coord, coord);
    endShape(CLOSE);


    beginShape(LINES);
    vertex(width, width);
    vertex(coord, coord);

    vertex(-width, -width);
    vertex(-coord, -coord);

    vertex(-width, width);
    vertex(-coord, coord);

    vertex(width, -width);
    vertex(coord, -coord);

    endShape();
                */
    } else if (coord % velocity === 0) {
        drawPolyShape(coord, sides)

        /*
        beginShape();
        vertex(-coord, -coord);

        vertex(coord, -coord);

        vertex(coord, coord);

        vertex(-coord, coord);
        endShape(CLOSE);
        */
    }
}

function doColor() {
    if (fillFigure) {
        print(`fillFigure and goingUp: ${goingUp}`);
        stroke(frameCount % 255, 150, 150);
        fill(frameCount % 255, 150, 150);
        //fill(frameCount % 255, 150, 150, 0.1);
    } else {
        if (goingUp) {
            print(`fillFigure ${fillFigure} and goingUp`);
            background(15, 10, 4, 0.02);
            fill(0, 0, 0, 0.1);
            strokeWeight(1)
            stroke(frameCount % 255, 150, 150);
        } else if (!goingUp) {
            print("going down  & stroke");
            fill(255, 10, 4, 0.1);
            background(15, 10, 4, 0.02);
            stroke(frameCount % 255, 150, 150);
        }

    }
}

function setVertexCoord() {
    if (goingUp) {
        vertexCoord++;
    } else {
        vertexCoord--;
    }
}

function listenKeyEvents() {
    if (keyIsDown(LEFT_ARROW)) {}

    if (keyIsDown(RIGHT_ARROW)) {}

    if (keyIsDown(UP_ARROW)) {
        goingUp = true;
    }

    if (keyIsDown(DOWN_ARROW)) {
        goingUp = false;
    }
    if (keyIsDown("32")) {
        paused = !paused
    }
    if (keyIsDown("82")) {
        rotateCanvas()
    }
}

function mouseWheel(event) {
    if (direction < 0) {
        //direction = -1;
        //goingUp = false;
    } else if (direction > 0) {
        //direction = 1;
        //goingUp = true;
    }
    direction = event.deltaY;

    //uncomment to block page scrolling
    return false;
}