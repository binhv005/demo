const Comparison = require('../models/Comparison');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// @desc    Get all comparisons
// @route   GET /api/comparisons
exports.getComparisons = async (req, res, next) => {
  try {
    const { type, categorySlug, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (categorySlug && categorySlug !== 'all') filter.categorySlug = categorySlug;
    if (status && status !== 'all') filter.status = status;

    const comparisons = await Comparison.find(filter).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách so sánh thành công',
      count: comparisons.length,
      data: comparisons
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single comparison by ID or Slug
// @route   GET /api/comparisons/:id
exports.getComparisonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let comparison;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      comparison = await Comparison.findById(id);
    } else {
      comparison = await Comparison.findOne({ slug: id });
    }

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài so sánh'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lấy thông tin so sánh thành công',
      data: comparison
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new comparison
// @route   POST /api/comparisons
exports.createComparison = async (req, res, next) => {
  try {
    const compData = { ...req.body };
    if (!compData.slug) {
      compData.slug = slugify(compData.title);
    }

    const comparison = await Comparison.create(compData);

    res.status(201).json({
      success: true,
      message: 'Tạo bài so sánh thành công',
      data: comparison
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update comparison
// @route   PATCH /api/comparisons/:id
exports.updateComparison = async (req, res, next) => {
  try {
    const { id } = req.params;
    let comparison;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      comparison = await Comparison.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    } else {
      comparison = await Comparison.findOneAndUpdate({ slug: id }, req.body, { new: true, runValidators: true });
    }

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài so sánh để cập nhật'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật bài so sánh thành công',
      data: comparison
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comparison
// @route   DELETE /api/comparisons/:id
exports.deleteComparison = async (req, res, next) => {
  try {
    const { id } = req.params;
    let comparison;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      comparison = await Comparison.findByIdAndDelete(id);
    } else {
      comparison = await Comparison.findOneAndDelete({ slug: id });
    }

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài so sánh để xóa'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa bài so sánh thành công',
      data: { id: comparison._id }
    });
  } catch (error) {
    next(error);
  }
};
