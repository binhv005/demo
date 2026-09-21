const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Vui lòng cung cấp email hợp lệ']
    },
    name: {
      type: String,
      trim: true,
      default: ''
    },
    phone: {
      type: String,
      trim: true,
      default: '',
      validate: {
        validator: function (v) {
          if (!v) return true;
          const cleaned = v.replace(/[\s.-]/g, '');
          return /^(0|\+84|84)(3|5|7|8|9)[0-9]{8}$/.test(cleaned);
        },
        message: 'Số điện thoại không hợp lệ (yêu cầu đầu số Việt Nam 03, 05, 07, 08, 09 hoặc +84)'
      }
    },
    website: {
      type: String,
      trim: true,
      default: ''
    },
    service: {
      type: String,
      default: 'Nhận bản tin & Deal tốt nhất'
    },
    message: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new'
    },
    source: {
      type: String,
      default: 'homepage'
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

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
