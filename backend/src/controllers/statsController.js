const Product = require('../models/Product');
const Category = require('../models/Category');
const Ranking = require('../models/Ranking');
const Article = require('../models/Article');
const Comparison = require('../models/Comparison');
const Expert = require('../models/Expert');
const Lead = require('../models/Lead');

// @desc    Get dashboard summary statistics
// @route   GET /api/stats
exports.getStats = async (req, res, next) => {
  try {
    const [
      productsCount,
      categoriesCount,
      rankingsCount,
      articlesCount,
      comparisonsCount,
      expertsCount,
      leadsCount,
      draftProductsCount,
      draftArticlesCount,
      productsViewsAgg,
      articlesViewsAgg
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Ranking.countDocuments(),
      Article.countDocuments(),
      Comparison.countDocuments(),
      Expert.countDocuments(),
      Lead.countDocuments(),
      Product.countDocuments({ status: 'draft' }),
      Article.countDocuments({ status: 'draft' }),
      Product.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
      Article.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }])
    ]);

    const totalProductViews = productsViewsAgg[0]?.total || 0;
    const totalArticleViews = articlesViewsAgg[0]?.total || 0;

    res.status(200).json({
      success: true,
      message: 'Lấy thống kê hệ thống thành công',
      data: {
        productsCount,
        categoriesCount,
        rankingsCount,
        articlesCount,
        comparisonsCount,
        expertsCount,
        leadsCount,
        draftsCount: draftProductsCount + draftArticlesCount,
        totalViews: totalProductViews + totalArticleViews,
        monthlyGrowth: 14.8
      }
    });
  } catch (error) {
    next(error);
  }
};
