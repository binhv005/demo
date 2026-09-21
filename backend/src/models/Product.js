const mongoose = require('mongoose');

const scoreBreakdownSchema = new mongoose.Schema(
  {
    design: { type: Number, default: 9, min: 0, max: 10 },
    performance: { type: Number, default: 9, min: 0, max: 10 },
    value: { type: Number, default: 9, min: 0, max: 10 },
    usability: { type: Number, default: 9, min: 0, max: 10 }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên sản phẩm là bắt buộc'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug sản phẩm là bắt buộc'],
      unique: true,
      trim: true,
      lowercase: true
    },
    type: {
      type: String,
      enum: ['physical', 'digital'],
      required: [true, 'Loại sản phẩm (physical/digital) là bắt buộc']
    },
    category: {
      type: String,
      required: [true, 'Danh mục là bắt buộc'],
      trim: true
    },
    categorySlug: {
      type: String,
      required: [true, 'Slug danh mục là bắt buộc'],
      trim: true
    },
    groupSlug: {
      type: String,
      required: [true, 'Group slug là bắt buộc'],
      trim: true
    },
    brand: {
      type: String,
      required: [true, 'Thương hiệu là bắt buộc'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Hình ảnh sản phẩm là bắt buộc']
    },
    gallery: {
      type: [String],
      default: []
    },
    score: {
      type: Number,
      required: [true, 'Điểm đánh giá là bắt buộc'],
      min: 0,
      max: 10,
      default: 9.0
    },
    ratingCount: {
      type: Number,
      default: 100,
      min: 0
    },
    price: {
      type: Number,
      required: [true, 'Giá sản phẩm là bắt buộc'],
      min: 0
    },
    originalPrice: {
      type: Number,
      min: 0
    },
    priceUnit: {
      type: String,
      default: '₫'
    },
    pros: {
      type: [String],
      default: []
    },
    cons: {
      type: [String],
      default: []
    },
    bestFor: {
      type: String,
      default: ''
    },
    shortDescription: {
      type: String,
      default: ''
    },
    deepReview: {
      type: String,
      default: ''
    },
    specs: {
      type: Map,
      of: String,
      default: {}
    },
    scoreBreakdown: {
      type: scoreBreakdownSchema,
      default: () => ({ design: 9, performance: 9, value: 9, usability: 9 })
    },
    badge: {
      type: String,
      default: ''
    },
    buyUrl: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published'
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

productSchema.index({ name: 'text', brand: 'text', shortDescription: 'text' });
productSchema.index({ categorySlug: 1, type: 1, status: 1 });

module.exports = mongoose.model('Product', productSchema);
