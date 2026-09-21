const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    count: { type: Number, default: 0 }
  },
  {
    _id: false,
    toJSON: { virtuals: true }
  }
);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên danh mục là bắt buộc'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug danh mục là bắt buộc'],
      unique: true,
      trim: true,
      lowercase: true
    },
    group: {
      type: String,
      enum: ['physical', 'digital'],
      required: [true, 'Nhóm danh mục là bắt buộc']
    },
    groupSlug: {
      type: String,
      required: [true, 'Group slug là bắt buộc'],
      trim: true
    },
    icon: {
      type: String,
      default: 'Box'
    },
    description: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    subcategories: {
      type: [subcategorySchema],
      default: []
    },
    featuredRankingSlug: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
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

module.exports = mongoose.model('Category', categorySchema);
