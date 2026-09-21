const Product = require('../models/Product');

// Helper to generate slug if not provided
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

// @desc    Get all products (with optional filtering, search, pagination)
// @route   GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const { type, categorySlug, groupSlug, status, search, limit, page, sort } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (categorySlug && categorySlug !== 'all') filter.categorySlug = categorySlug;
    if (groupSlug && groupSlug !== 'all') filter.groupSlug = groupSlug;
    if (status && status !== 'all') filter.status = status;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    let query = Product.find(filter);

    // Sorting
    if (sort === 'score_desc') query = query.sort({ score: -1 });
    else if (sort === 'price_asc') query = query.sort({ price: 1 });
    else if (sort === 'price_desc') query = query.sort({ price: -1 });
    else if (sort === 'newest') query = query.sort({ createdAt: -1 });
    else query = query.sort({ createdAt: -1 });

    // Pagination
    if (limit) {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;
      query = query.skip(skip).limit(limitNum);
    }

    const products = await query;
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách sản phẩm thành công',
      count: products.length,
      total,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;

    // Check if ID is a valid MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }

    // Increment view count asynchronously
    Product.findByIdAndUpdate(product._id, { $inc: { views: 1 } }).exec();

    res.status(200).json({
      success: true,
      message: 'Lấy thông tin sản phẩm thành công',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };
    if (!productData.slug) {
      productData.slug = slugify(productData.name) + '-' + Date.now().toString().slice(-4);
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Tạo sản phẩm thành công',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PATCH /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    } else {
      product = await Product.findOneAndUpdate({ slug: id }, req.body, { new: true, runValidators: true });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm để cập nhật'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findByIdAndDelete(id);
    } else {
      product = await Product.findOneAndDelete({ slug: id });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm để xóa'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa sản phẩm thành công',
      data: { id: product._id }
    });
  } catch (error) {
    next(error);
  }
};
