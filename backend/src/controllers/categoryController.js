const Category = require('../models/Category');

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

// @desc    Get all categories
// @route   GET /api/categories
exports.getCategories = async (req, res, next) => {
  try {
    const { group, status } = req.query;
    const filter = {};
    if (group) filter.group = group;
    if (status) filter.status = status;

    const categories = await Category.find(filter).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách danh mục thành công',
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by ID or Slug
// @route   GET /api/categories/:id
exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let category;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      category = await Category.findById(id);
    } else {
      category = await Category.findOne({ slug: id });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lấy danh mục thành công',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/categories
exports.createCategory = async (req, res, next) => {
  try {
    const categoryData = { ...req.body };
    if (!categoryData.slug) {
      categoryData.slug = slugify(categoryData.name);
    }

    const category = await Category.create(categoryData);

    res.status(201).json({
      success: true,
      message: 'Tạo danh mục thành công',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PATCH /api/categories/:id
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    let category;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      category = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    } else {
      category = await Category.findOneAndUpdate({ slug: id }, req.body, { new: true, runValidators: true });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục để cập nhật'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật danh mục thành công',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    let category;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      category = await Category.findByIdAndDelete(id);
    } else {
      category = await Category.findOneAndDelete({ slug: id });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục để xóa'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa danh mục thành công',
      data: { id: category._id }
    });
  } catch (error) {
    next(error);
  }
};
