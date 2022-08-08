// (function() {
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

export function disableScroll() {
  if (window.addEventListener)
    // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.addEventListener('wheel', preventDefault); // modern standard
  document.addEventListener('mousewheel', preventDefault); // older browsers, IE
  window.addEventListener('mousewheel', preventDefault); // older browsers, IE
  window.addEventListener('touchmove', preventDefault); // mobile
  document.onkeydown = preventDefaultForScrollKeys;
}

export function enableScroll() {
  if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  document.removeEventListener('mousewheel', preventDefault, false);
  window.removeEventListener('mousewheel', preventDefault, false);
  window.removeEventListener('wheel', preventDefault, false);
  window.removeEventListener('touchmove', preventDefault, false);
  document.onkeydown = null;
}
