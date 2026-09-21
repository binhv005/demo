const mongoose = require('mongoose');

const comparisonFeatureSchema = new mongoose.Schema(
  {
    feature: { type: String, required: true },
    productA: { type: String, default: '' },
    productB: { type: String, default: '' },
    winner: { type: String, enum: ['A', 'B', 'Tie'], default: 'Tie' }
  },
  { _id: false }
);

const comparisonFaqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true }
  },
  { _id: false }
);

const comparisonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Tiêu đề so sánh là bắt buộc'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug so sánh là bắt buộc'],
      unique: true,
      trim: true,
      lowercase: true
    },
    type: {
      type: String,
      enum: ['physical', 'digital'],
      required: [true, 'Loại sản phẩm là bắt buộc']
    },
    categorySlug: {
      type: String,
      required: [true, 'Category slug là bắt buộc'],
      trim: true
    },
    productAId: {
      type: String,
      required: [true, 'Sản phẩm A là bắt buộc']
    },
    productBId: {
      type: String,
      required: [true, 'Sản phẩm B là bắt buộc']
    },
    winnerId: {
      type: String,
      required: [true, 'Sản phẩm chiến thắng là bắt buộc']
    },
    image: {
      type: String,
      default: ''
    },
    verdict: {
      type: String,
      default: ''
    },
    priceComparison: {
      type: String,
      default: ''
    },
    features: {
      type: [comparisonFeatureSchema],
      default: []
    },
    experienceComparison: {
      type: String,
      default: ''
    },
    finalRecommendation: {
      type: String,
      default: ''
    },
    authorId: {
      type: String,
      default: 'exp-1'
    },
    faq: {
      type: [comparisonFaqSchema],
      default: []
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isTopRanking: {
      type: Boolean,
      default: false
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

module.exports = mongoose.model('Comparison', comparisonSchema);
