let inc = 0.1;
let scl = 20;
let cols, rows;

let zoff = 0;

let fr;

let particles = [];

let flowf;

let nparticles = 100;

function setup() {
    createCanvas(800, 800);
    pixelDensity(1);
    cols = floor(width / scl);
    rows = floor(height / scl);

    fr = createP('');

    sv = createP('');
    s = createSlider(0.001, 5, 0.1, 0.001);

    p = createSlider(0.0001, 0.001, 0.0001, 0.0001);



    flowf = new Array(cols * rows);

    for (let i = 0; i < nparticles; i++)
        particles[i] = new Particle();
}

function draw() {
    background(255);
    let yoff = 0;
    for (let y = 0; y <= rows; y++) {
        let xoff = 0;
        for (let x = 0; x <= cols; x++) {
            let index = (x + y * cols);
            let angle = noise(xoff, yoff, zoff) * TWO_PI;
            let force = p5.Vector.fromAngle(angle);

            // force.setMag(1);
            force.setMag(s.value());

            flowf[index] = force;

            xoff += inc;

            stroke(0, 50);
            strokeWeight(2);
            push();
            translate(x * scl, y * scl);
            rotate(force.heading());
            line(0, 0, scl, 0)
            pop();
        }
        yoff += inc;

        // zoff += 0.0003;

        zoff += p.value();
    }


    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowf);
        particles[i].update();
        particles[i].show();
    }

    fr.html(' &emsp; &emsp; &emsp; &emsp; Frame Rate: ' + floor(frameRate()) +
        '<br/><br/> &emsp;Wind Force: ' + s.value() +
        " &emsp;Variability: " + p.value());
}