const { z } = require('zod');

const subcategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  count: z.number().optional().default(0)
});

const createCategorySchema = z.object({
  name: z.string().min(1, 'Tên danh mục là bắt buộc'),
  slug: z.string().optional(),
  group: z.enum(['physical', 'digital']),
  groupSlug: z.string().min(1),
  icon: z.string().optional().default('Box'),
  description: z.string().optional().default(''),
  count: z.number().optional().default(0),
  subcategories: z.array(subcategorySchema).optional().default([]),
  featuredRankingSlug: z.string().optional().default(''),
  status: z.enum(['active', 'inactive']).optional().default('active')
});

const updateCategorySchema = createCategorySchema.partial();

module.exports = {
  createCategorySchema,
  updateCategorySchema
};
