const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên chuyên gia là bắt buộc'],
      trim: true
    },
    role: {
      type: String,
      required: [true, 'Chức danh/vị trí là bắt buộc'],
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    bio: {
      type: String,
      default: ''
    },
    articlesCount: {
      type: Number,
      default: 0
    },
    experienceYears: {
      type: Number,
      default: 1
    },
    credentials: {
      type: [String],
      default: []
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

module.exports = mongoose.model('Expert', expertSchema);
