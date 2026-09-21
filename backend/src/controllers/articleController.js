const Article = require('../models/Article');

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

// @desc    Get all articles
// @route   GET /api/articles
exports.getArticles = async (req, res, next) => {
  try {
    const { type, productType, categorySlug, status, tag, search } = req.query;
    const filter = {};

    if (type && type !== 'all') filter.type = type;
    if (productType) filter.productType = productType;
    if (categorySlug && categorySlug !== 'all') filter.categorySlug = categorySlug;
    if (status && status !== 'all') filter.status = status;
    if (tag) filter.tags = tag;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const articles = await Article.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách bài viết thành công',
      count: articles.length,
      data: articles
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single article by ID or Slug
// @route   GET /api/articles/:id
exports.getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let article;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findById(id);
    } else {
      article = await Article.findOne({ slug: id });
    }

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết'
      });
    }

    // Increment views asynchronously
    Article.findByIdAndUpdate(article._id, { $inc: { views: 1 } }).exec();

    res.status(200).json({
      success: true,
      message: 'Lấy bài viết thành công',
      data: article
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new article
// @route   POST /api/articles
exports.createArticle = async (req, res, next) => {
  try {
    const articleData = { ...req.body };
    if (!articleData.slug) {
      articleData.slug = slugify(articleData.title) + '-' + Date.now().toString().slice(-4);
    }
    if (!articleData.publishedAt) {
      articleData.publishedAt = `${new Date().getDate()} Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`;
    }

    const article = await Article.create(articleData);

    res.status(201).json({
      success: true,
      message: 'Đăng bài viết thành công',
      data: article
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update article
// @route   PATCH /api/articles/:id
exports.updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    let article;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    } else {
      article = await Article.findOneAndUpdate({ slug: id }, req.body, { new: true, runValidators: true });
    }

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết để cập nhật'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật bài viết thành công',
      data: article
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete article
// @route   DELETE /api/articles/:id
exports.deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    let article;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findByIdAndDelete(id);
    } else {
      article = await Article.findOneAndDelete({ slug: id });
    }

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết để xóa'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa bài viết thành công',
      data: { id: article._id }
    });
  } catch (error) {
    next(error);
  }
};
