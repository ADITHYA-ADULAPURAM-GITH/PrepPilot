// import { ApiError } from "../utils/apiResponse.js";

// /**
//  * Validates { body, params, query } against a Zod schema.
//  * On success, replaces req.body/params/query with the *parsed* (and
//  * coerced/trimmed) values so downstream code can trust their shape.
//  */
// export function validate(schema) {
//   return (req, res, next) => {
//     const result = schema.safeParse({
//       body: req.body,
//       params: req.params,
//       query: req.query,
//     });

//     if (!result.success) {
//       const errors = result.error.issues.map((issue) => ({
//         field: issue.path.slice(1).join("."),
//         message: issue.message,
//       }));
//       return next(new ApiError(422, "Validation failed", errors));
//     }

//     if (result.data.body) req.body = result.data.body;
//     if (result.data.params) req.params = result.data.params;
//     if (result.data.query) req.query = result.data.query;

//     next();
//   };
// }
import { ApiError } from "../utils/apiResponse.js";

/**
 * Validates { body, params, query } against a Zod schema.
 * On success, replaces req.body/params/query with the *parsed* (and
 * coerced/trimmed) values so downstream code can trust their shape.
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.slice(1).join("."),
        message: issue.message,
      }));
      return next(new ApiError(422, "Validation failed", errors));
    }

    if (result.data.body) req.body = result.data.body;
    if (result.data.params) req.params = result.data.params;
    if (result.data.query) {
      // Express 5's req.query is a non-caching getter — it recomputes
      // from the raw URL on every access, so mutating the object it
      // returns doesn't persist and `req.query = x` throws (no setter).
      // Replacing the property descriptor is the only way to make the
      // parsed/coerced query values actually stick for later middleware.
      Object.defineProperty(req, "query", {
        value: result.data.query,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }

    next();
  };
}