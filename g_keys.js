// =================
// KEYBOARD HANDLING
// =================

var g_keys = [];
var mouse;

function handleKeydown(evt) {
    g_keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
    g_keys[evt.keyCode] = false;
}

mouse = (function (target) {
  var isButtonDown = false;
  target.addEventListener('mousedown', function () {
    isButtonDown = true;
  });
  target.addEventListener('mouseup', function () {
    isButtonDown = false;
  });

  return {
    isButtonDown: function () {
      return isButtonDown;
    }
  };
}(g_canvas));

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
    var isDown = g_keys[keyCode];
    g_keys[keyCode] = false;
    return isDown;
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
