/**
 * Simple throttle implementation in JavaScript.
 * Returns a wrapper function that ensures `fn` is invoked
 * at most once every `delay` milliseconds.
 *
 * Notes:
 * - The wrapper preserves `this` context and arguments.
 * - Intermediate calls within the delay window are ignored (no trailing call).
 */
function throttle(fn, delay) {
  if (typeof fn !== 'function') {
    throw new TypeError('throttle expects a function');
  }
  if (typeof delay !== 'number' || delay < 0) {
    delay = 0;
  }

  let lastCall = 0;

  return function throttled(...args) {
    const now = Date.now();
    const context = this;
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(context, args);
    }
  };
}

// Example usage:
// function log(msg) {
//   console.log(msg, Date.now());
// }
// const thr = throttle(log, 1000);
// thr('A'); // logs immediately
// thr('B'); // ignored if called within 1s of previous call
// setTimeout(() => thr('C'), 1200); // logs after ~1.2s
