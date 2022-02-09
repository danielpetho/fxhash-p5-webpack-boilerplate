import p5 from "p5";
import * as R from './random.js'

// these are the variables you can use as inputs to your algorithms
console.log(fxhash)   // the 64 chars hex number fed to your algorithm
console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function 
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }

let canvas_size = Math.min(window.innerWidth, window.innerHeight);

let sketch = (p5) => {

  let someColors = [
    [248, 127, 206],
    [31,  44,  237],
    [246, 61,  67 ],
    [230, 134, 57 ],
    [250, 198, 14 ]
  ]

  let elements = [];

  for (let i = 5; i < 15; ++i) {
    for ( let j = 5; j < 15; ++j) {
      let x = i * 5;
      let y = j * 5;
      let r = R.fxrand_num(canvas_size / 500, canvas_size / 250);
      let col = R.fxrand_choice(someColors);
      let type = R.fxrand_bool(0.3) ? "rect" : "ellipse"; 

      elements.push([x, y, r, col, type])
    }
  }

  p5.setup = () => {
    p5.createCanvas(canvas_size, canvas_size);
  }

  p5.draw = () => {
    p5.background(235, 235, 235);
   
    p5.noStroke();
    elements.forEach( e => {
      p5.fill(e[3]);

      let mult = canvas_size / 100;
      p5.push();
      p5.translate( e[0] * mult, e[1] * mult);
      e[4] == "rect" ? p5.ellipse(0, 0, e[2] * mult, e[2] * mult) : p5.rect(-e[2] * mult / 2, -e[2] * mult / 2, e[2] * mult, e[2] * mult);
      p5.pop();

    });
    fxpreview();
    p5.noLoop();
  }

  p5.windowResized = () => {
    canvas_size = p5.min(p5.windowWidth, p5.windowHeight);
    p5.resizeCanvas(canvas_size, canvas_size);
  }

}

let myp5 = new p5(sketch, window.document.body);