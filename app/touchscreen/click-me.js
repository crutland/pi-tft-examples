/// <reference path="../types/pitft.d.ts" />

var fb = require("pitft")("/dev/fb1", true);
var touchscreen = require("pitft-touch");

module.exports = function () {

  console.log("starting node.js script...")

  // Clear the back buffer

  var xMax = fb.size().width;
  var yMax = fb.size().height;

  console.log("fb.size(): ", fb.size());

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

  var drawInitialMessage = function () {
    drawToCenter("Click Me", false);
  }

  var onTouch = function (err, data) {
    // properties on data:
    //     x, y, stop, and touch. not sure what stop is, 
    //     but touch is 1 for the down event, and 0 for the up event
    if (!data.touch) {
      //clear the screen 1 second after you release
      setTimeout(drawInitialMessage, 1000);
    } else {
      //write a touched message to the screen
      var msg = "Touched at (" + data.x + "," + data.y + ")";
      drawToCenter(msg, true);
    }
  }

  touchscreen("/dev/input/touchscreen0", onTouch);
  drawInitialMessage();
}