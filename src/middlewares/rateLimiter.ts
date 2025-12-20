import rateLimit from 'express-rate-limit';

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 10 * 60 * 1000;
const MAX = Number(process.env.RATE_LIMIT_MAX) || 100;
const SKIP_FAILED = process.env.RATE_LIMIT_SKIP_FAILED === '1' || false;

export const rateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: SKIP_FAILED,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
});
