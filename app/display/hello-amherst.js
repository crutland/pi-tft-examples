/// <reference path="../types/pitft.d.ts" />

var fb = require("pitft")("/dev/fb1", true);

module.exports = function () {

  console.log("starting node.js script...")

  // Clear the back buffer
  fb.clear();

  var xMax = fb.size().width;
  var yMax = fb.size().height;

  var draw = function () {
    fb.clear();
    fb.color(0, 0, 0)
    fb.rect(0, 0, xMax, yMax);
    fb.color(1, 1, 1);
    fb.font("fantasy", 34);
    fb.text(xMax / 2, yMax / 2, "Hello Amherst!", true);
    fb.blit();
  }

  draw();

  setInterval(draw, 5000);
}