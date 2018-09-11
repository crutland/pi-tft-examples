/// <reference path="../types/pitft.d.ts" />

var fb = require("pitft")("/dev/fb1", true);
var touchscreen = require("pitft-touch");

module.exports = function () {

  console.log("starting node.js script...")

  // Clear the back buffer
  fb.clear();

  var xMax = fb.size().width;
  var yMax = fb.size().height;

  var drawToCenter = function (text, invert) {
    fb.clear();
    if (invert) {
      fb.color(0, 0, 0);
    } else {
      fb.color(1, 1, 1);
    }
    fb.rect(0, 0, xMax, yMax);
    if (invert) {
      fb.color(1, 1, 1);
    } else {
      fb.color(0, 0, 0);
    }
    fb.font("fantasy", 34);
    fb.text(xMax / 2, yMax / 2, text, true);
    fb.blit();
  }

  drawToCenter("Click Me", false);

  var onTouch = function (err, data) {
    if (!data.touch) {
      console.log("released");
      return;
    }
    var msg = "Touched at (" + data.x + "," + data.y + ")";
    drawToCenter(msg, true);
    setTimeout(function () { drawToCenter("Click Me!", false); }, 2000);
  }

  touchscreen("/dev/input/touchscreen0", onTouch);
}