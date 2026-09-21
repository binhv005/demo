const mongoose = require('mongoose');

const tocItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true }
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Tiêu đề bài viết là bắt buộc'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug bài viết là bắt buộc'],
      unique: true,
      trim: true,
      lowercase: true
    },
    type: {
      type: String,
      enum: ['review', 'guide', 'comparison', 'news'],
      default: 'guide'
    },
    productType: {
      type: String,
      enum: ['physical', 'digital'],
      default: 'physical'
    },
    categorySlug: {
      type: String,
      required: [true, 'Category slug là bắt buộc'],
      trim: true
    },
    coverImage: {
      type: String,
      default: ''
    },
    excerpt: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    blocks: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    tableOfContents: {
      type: [tocItemSchema],
      default: []
    },
    authorId: {
      type: String,
      default: 'exp-1'
    },
    readingTime: {
      type: String,
      default: '5 phút đọc'
    },
    publishedAt: {
      type: String,
      default: () => `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
    },
    relatedProductIds: {
      type: [String],
      default: []
    },
    tags: {
      type: [String],
      default: []
    },
    views: {
      type: Number,
      default: 0
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
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    topRankOrder: {
      type: Number,
      default: null
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

module.exports = mongoose.model('Article', articleSchema);
