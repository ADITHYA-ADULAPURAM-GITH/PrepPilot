/**
 * Wraps an async route handler so rejected promises are forwarded to
 * Express's error middleware instead of crashing the process.
 * (Express 5 does this automatically, but keeping handlers explicit
 * makes the control flow obvious and keeps this codebase portable to
 * Express 4 environments without any changes.)
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
