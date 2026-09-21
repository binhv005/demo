const mongoose = require('mongoose');

const rankingItemSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    productId: { type: String, required: true },
    highlight: { type: String, default: '' },
    verdict: { type: String, default: '' },
    customPros: { type: [String], default: [] },
    customCons: { type: [String], default: [] }
  },
  { _id: false }
);

const rankingFaqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true }
  },
  { _id: false }
);

const rankingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Tiêu đề bảng xếp hạng là bắt buộc'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug bảng xếp hạng là bắt buộc'],
      unique: true,
      trim: true,
      lowercase: true
    },
    type: {
      type: String,
      enum: ['physical', 'digital'],
      required: [true, 'Loại sản phẩm là bắt buộc']
    },
    groupSlug: {
      type: String,
      required: [true, 'Group slug là bắt buộc'],
      trim: true
    },
    categorySlug: {
      type: String,
      required: [true, 'Category slug là bắt buộc'],
      trim: true
    },
    image: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    authorId: {
      type: String,
      default: 'exp-1'
    },
    intro: {
      type: String,
      default: ''
    },
    methodology: {
      type: String,
      default: ''
    },
    quickPicks: {
      bestOverallId: { type: String, default: '' },
      bestValueId: { type: String, default: '' },
      bestPremiumId: { type: String, default: '' }
    },
    items: {
      type: [rankingItemSchema],
      default: []
    },
    conclusion: {
      type: String,
      default: ''
    },
    faq: {
      type: [rankingFaqSchema],
      default: []
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published'
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

module.exports = mongoose.model('Ranking', rankingSchema);
