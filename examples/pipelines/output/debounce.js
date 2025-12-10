/**
 * Debounce a function so it only runs after a specified delay has elapsed
 * since the last invocation.
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {boolean} [immediate=false] - If true, trigger on the leading edge, instead of on the trailing
 * @returns {Function} Debounced function
 */
function debounce(fn, delay, immediate = false) {
  let timeoutId;
  return function debounced(...args) {
    const context = this;

    const later = () => {
      timeoutId = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    };

    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, delay);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}

// Usage example:
// const onResize = debounce(() => console.log('Resized'), 200);
// window.addEventListener('resize', onResize);
