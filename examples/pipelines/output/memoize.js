/**
 * A simple memoize function
 * Caches results of a function based on its arguments.
 * Note: This uses JSON.stringify(args) as the cache key, which works best for
 * primitive/JSON-serializable arguments. If your function depends on 'this' or
 * non-serializable args, you may need a more robust key or binding strategy.
 */
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    // Preserve 'this' context for methods; note that this simple key does not
    // differentiate by 'this'. For methods with varying this, consider binding
    // or including context in the key.
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: an expensive computation (simulated with a heavy loop)
function heavyComputation(n) {
  let acc = 0;
  for (let i = 0; i < 1_000_000; i++) {
    acc += Math.sqrt(n + i);
  }
  return acc;
}

const memoHeavyComputation = memoize(heavyComputation);

console.log(memoHeavyComputation(42)); // computed on first call
console.log(memoHeavyComputation(42)); // returned from cache
