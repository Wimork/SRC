// Array of control points for two Bézier curves
let p = [
  {x: Math.random() * 1000, y: Math.random() * 1000},
  {x: Math.random() * 1000, y: Math.random() * 1000},
  {x: Math.random() * 1000, y: Math.random() * 1000},
  {x: Math.random() * 1000, y: Math.random() * 1000},
  {x: Math.random() * 1000, y: Math.random() * 1000},
  {x: Math.random() * 1000, y: Math.random() * 1000},
  {x: Math.random() * 1000, y: Math.random() * 1000},
  {x: Math.random() * 1000, y: Math.random() * 1000}
];

// Points on the curves being computed
let pC = [
  {x: undefined, y: undefined},
  {x: undefined, y: undefined}
];

// Bounding boxes for the two curves
let BB = [
  {xmin: 1000, xmax: 0, ymin: 1000, ymax: 0},
  {xmin: 1000, xmax: 0, ymin: 1000, ymax: 0}
];

// Track which point is being dragged
let draggingPoint = null;

function setup() {
  createCanvas(1000, 1000);
  background(255);
}

function draw() {
  background(255);
  
  // Initialize new bounding boxes
  let newBB = [
    { xmin: 1000, xmax: 0, ymin: 1000, ymax: 0 },
    { xmin: 1000, xmax: 0, ymin: 1000, ymax: 0 }
  ];

  // Compute Bézier curves and update bounding boxes
  for (let t = 0; t < 1; t += 0.001) {
    let P1 = computeBezier(p.slice(0, 4), t);
    let P2 = computeBezier(p.slice(4, 8), t);
    pC = [P1, P2];

    // Update bounding boxes
    newBB[0].xmin = min(P1.x, newBB[0].xmin);
    newBB[0].xmax = max(P1.x, newBB[0].xmax);
    newBB[0].ymin = min(P1.y, newBB[0].ymin);
    newBB[0].ymax = max(P1.y, newBB[0].ymax);

    newBB[1].xmin = min(P2.x, newBB[1].xmin);
    newBB[1].xmax = max(P2.x, newBB[1].xmax);
    newBB[1].ymin = min(P2.y, newBB[1].ymin);
    newBB[1].ymax = max(P2.y, newBB[1].ymax);

    // Draw points on the curves
    fill(0, 255, 0);
    noStroke();
    circle(P1.x, P1.y, 5);
    fill(255, 0, 0);
    circle(P2.x, P2.y, 5);
  }

  BB = newBB;
  drawControlPoints();
  drawBoundingBox(BB);
  drawIntersectionBox(BB);
}

// Compute a point on a cubic Bézier curve using the de Casteljau algorithm
function computeBezier(points, t) {
  let x = (1 - t) * ((1 - t) * ((1 - t) * points[0].x + points[1].x * t) + ((1 - t) * points[1].x + points[2].x * t) * t) + 
          ((1 - t) * ((1 - t) * points[1].x + points[2].x * t) + ((1 - t) * points[2].x + points[3].x * t) * t) * t;
  let y = (1 - t) * ((1 - t) * ((1 - t) * points[0].y + points[1].y * t) + ((1 - t) * points[1].y + points[2].y * t) * t) + 
          ((1 - t) * ((1 - t) * points[1].y + points[2].y * t) + ((1 - t) * points[2].y + points[3].y * t) * t) * t;
  return {x, y};
}

// Draw control points of Bézier curves
function drawControlPoints() {
  for (let i = 0; i < p.length; i++) {
    fill(i < 4 ? color(0, 255, 0) : color(255, 0, 0));
    stroke(1);
    circle(p[i].x, p[i].y, 10);
  }
}

// Draw bounding boxes for Bézier curves
function drawBoundingBox(BB) {
  for (let i = 0; i < BB.length; i++) {
    stroke(1);
    noFill();
    quad(
      BB[i].xmin, BB[i].ymin,
      BB[i].xmax, BB[i].ymin,
      BB[i].xmax, BB[i].ymax,
      BB[i].xmin, BB[i].ymax
    );
  }
}

// Draw a red box marking the intersection of bounding boxes
function drawIntersectionBox(BB) {
  let xOverlapMin = max(BB[0].xmin, BB[1].xmin);
  let xOverlapMax = min(BB[0].xmax, BB[1].xmax);
  let yOverlapMin = max(BB[0].ymin, BB[1].ymin);
  let yOverlapMax = min(BB[0].ymax, BB[1].ymax);

  if (xOverlapMin < xOverlapMax && yOverlapMin < yOverlapMax) {
    fill(255, 0, 0, 100);
    noStroke();
    rect(xOverlapMin, yOverlapMin, xOverlapMax - xOverlapMin, yOverlapMax - yOverlapMin);
  }
}

// Detect if a control point is clicked
function mousePressed() {
  for (let i = 0; i < p.length; i++) {
    if (dist(mouseX, mouseY, p[i].x, p[i].y) < 10) {
      draggingPoint = i;
      break;
    }
  }
}

// Update position of dragged control point
function mouseDragged() {
  if (draggingPoint !== null) {
    p[draggingPoint].x = mouseX;
    p[draggingPoint].y = mouseY;
  }
}

// Release control point after dragging
function mouseReleased() {
  draggingPoint = null;
}
