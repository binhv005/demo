const { z } = require('zod');

const createProductSchema = z.object({
  name: z.string().min(2, 'Tên sản phẩm phải có ít nhất 2 ký tự').max(200),
  slug: z.string().optional(),
  type: z.enum(['physical', 'digital']),
  category: z.string().min(1, 'Danh mục không được để trống'),
  categorySlug: z.string().min(1, 'Category slug không được để trống'),
  groupSlug: z.string().min(1, 'Group slug không được để trống'),
  brand: z.string().min(1, 'Thương hiệu không được để trống'),
  image: z.string().min(1, 'Hình ảnh không được để trống'),
  gallery: z.array(z.string()).optional().default([]),
  score: z.number().min(0).max(10).default(9.0),
  ratingCount: z.number().min(0).optional().default(100),
  price: z.number().min(0, 'Giá không được âm'),
  originalPrice: z.number().min(0).optional(),
  priceUnit: z.string().optional().default('₫'),
  pros: z.array(z.string()).optional().default([]),
  cons: z.array(z.string()).optional().default([]),
  bestFor: z.string().optional().default(''),
  shortDescription: z.string().optional().default(''),
  deepReview: z.string().optional().default(''),
  specs: z.record(z.string()).optional().default({}),
  scoreBreakdown: z
    .object({
      design: z.number().min(0).max(10).optional().default(9),
      performance: z.number().min(0).max(10).optional().default(9),
      value: z.number().min(0).max(10).optional().default(9),
      usability: z.number().min(0).max(10).optional().default(9)
    })
    .optional(),
  badge: z.string().optional().default(''),
  buyUrl: z.string().optional().default(''),
  status: z.enum(['published', 'draft', 'archived']).optional().default('published')
});

const updateProductSchema = createProductSchema.partial();

module.exports = {
  createProductSchema,
  updateProductSchema
};
