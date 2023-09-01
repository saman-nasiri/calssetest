const rateLimit =require('express-rate-limit');

// API rate limiter configuration
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later', // Custom message
  headers: true, // Uses the X-RateLimit-* headers to provide more info
  skipSuccessfulRequests: false, // Count successful requests towards the rate limit
});

// You can add more rate limiters for different routes if needed.
// For example, a more stringent rate limiter for login to prevent brute force attacks:
export const loginRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 login attempts per hour
  message: 'Too many login attempts from this IP, please try again later', // Custom message
});
