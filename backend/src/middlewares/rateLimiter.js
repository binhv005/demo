const rateLimit = require('express-rate-limit');

// General API rate limit: 200 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: {
    success: false,
    message: 'Quá nhiều yêu cầu từ IP của bạn, vui lòng thử lại sau 15 phút.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict limiter for public lead / contact submissions: 10 requests per 10 minutes
const leadSubmissionLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: 'Bạn đã gửi yêu cầu quá thường xuyên. Vui lòng thử lại sau ít phút.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  apiLimiter,
  leadSubmissionLimiter
};
