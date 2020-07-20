function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxv = 10;

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxv);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.edges();
    }

    this.follow = function(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);

        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.show = function() {
        stroke(0);
        strokeWeight(10);
        point(this.pos.x, this.pos.y);
    }

    this.edges = function() {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;

        /* if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
        if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1; */
    }
}