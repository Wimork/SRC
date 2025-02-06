
p10 = {x: Math.random()*1000,y: Math.random()*1000};
p11 = {x: Math.random()*1000,y: Math.random()*1000};
p12 = {x: Math.random()*1000,y: Math.random()*1000};
p13 = {x: Math.random()*1000,y: Math.random()*1000},
p20 = {x: Math.random()*1000,y: Math.random()*1000};
p21 = {x: Math.random()*1000,y: Math.random()*1000};
p22 = {x: Math.random()*1000,y: Math.random()*1000};
p23 = {x: Math.random()*1000,y: Math.random()*1000},
P1 = {x: 0,y: 0};
P2 = {x: 0,y: 0};
x = {min: 0, max: 0};
y = {min: 0, max: 0};


function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  for(t=0; t<1; t=t+0.001) {
    P1.x = (1 - t)*((1 - t)*((1 - t)*p10.x + p11.x*t) + ((1 - t)*p11.x + p12.x*t)*t) + ((1 - t)*((1 - t)*p11.x + p12.x*t) + ((1 - t)*p12.x + p13.x*t)*t)*t;
    P1.y = (1 - t)*((1 - t)*((1 - t)*p10.y + p11.y*t) + ((1 - t)*p11.y + p12.y*t)*t) + ((1 - t)*((1 - t)*p11.y + p12.y*t) + ((1 - t)*p12.y + p13.y*t)*t)*t;
    P2.x = (1 - t)*((1 - t)*((1 - t)*p20.x + p21.x*t) + ((1 - t)*p21.x + p22.x*t)*t) + ((1 - t)*((1 - t)*p21.x + p22.x*t) + ((1 - t)*p22.x + p23.x*t)*t)*t;
    P2.y = (1 - t)*((1 - t)*((1 - t)*p20.y + p21.y*t) + ((1 - t)*p21.y + p22.y*t)*t) + ((1 - t)*((1 - t)*p21.y + p22.y*t) + ((1 - t)*p22.y + p23.y*t)*t)*t;
    
    fill(0,255,0);
    noStroke()
    circle(P1.x, P1.y, 5);
    fill(255,0,0)
    circle(P2.x, P2.y, 5);
  }

}