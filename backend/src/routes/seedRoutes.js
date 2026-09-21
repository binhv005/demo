const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Ranking = require('../models/Ranking');
const Comparison = require('../models/Comparison');
const Article = require('../models/Article');
const Expert = require('../models/Expert');
const Lead = require('../models/Lead');
const {
  sampleCategories,
  sampleExperts,
  sampleProducts,
  sampleRankings,
  sampleComparisons,
  sampleArticles,
  sampleLeads
} = require('../scripts/seedData');

// @desc    Seed / Reset MongoDB collections with initial data
// @route   POST /api/seed
router.post('/', async (req, res, next) => {
  try {
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      Ranking.deleteMany({}),
      Comparison.deleteMany({}),
      Article.deleteMany({}),
      Expert.deleteMany({}),
      Lead.deleteMany({})
    ]);

    await Promise.all([
      Category.insertMany(sampleCategories),
      Expert.insertMany(sampleExperts),
      Product.insertMany(sampleProducts),
      Ranking.insertMany(sampleRankings),
      Comparison.insertMany(sampleComparisons),
      Article.insertMany(sampleArticles),
      Lead.insertMany(sampleLeads)
    ]);

    res.status(200).json({
      success: true,
      message: 'Khôi phục dữ liệu gốc MongoDB thành công!'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
