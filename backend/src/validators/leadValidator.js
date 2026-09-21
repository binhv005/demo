const { z } = require('zod');

// Regex kiểm tra số điện thoại hợp lệ tại Việt Nam (đầu số 03, 05, 07, 08, 09 hoặc +84 / 84)
const VN_PHONE_REGEX = /^(0|\+84|84)(3|5|7|8|9)[0-9]{8}$/;

const createLeadSchema = z.object({
  email: z.string().email('Email không đúng định dạng').min(5).max(100),
  name: z.string().max(100).optional().default(''),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s.-]/g, ''))
    .refine(
      (val) => !val || VN_PHONE_REGEX.test(val),
      {
        message: 'Số điện thoại không hợp lệ (yêu cầu số điện thoại Việt Nam 10 số đầu 03, 05, 07, 08, 09 hoặc +84)'
      }
    )
    .optional()
    .default(''),
  website: z.string().max(200).optional().default(''),
  service: z.string().max(100).optional().default('Nhận bản tin & Deal tốt nhất'),
  message: z.string().max(1000).optional().default(''),
  source: z.string().max(50).optional().default('homepage')
});

const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'resolved']).optional(),
  message: z.string().max(1000).optional(),
  service: z.string().max(100).optional()
});

module.exports = {
  createLeadSchema,
  updateLeadSchema
};
