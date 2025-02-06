p0 = [random(0, 1000), random(0, 1000)];
p1 = [random(0, 1000), random(0, 1000)];
p2 = [random(0, 1000), random(0, 1000)];
p3 = [random(0, 1000), random(0, 1000)];

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  noFill();
  stroke(1);
  strokeWeight(1);
  bezier(p0, p1, p2, p3);
}