const Ranking = require('../models/Ranking');

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

// @desc    Get all rankings
// @route   GET /api/rankings
exports.getRankings = async (req, res, next) => {
  try {
    const { type, groupSlug, categorySlug, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (groupSlug && groupSlug !== 'all') filter.groupSlug = groupSlug;
    if (categorySlug && categorySlug !== 'all') filter.categorySlug = categorySlug;
    if (status && status !== 'all') filter.status = status;

    const rankings = await Ranking.find(filter).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách bảng xếp hạng thành công',
      count: rankings.length,
      data: rankings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single ranking by ID or Slug
// @route   GET /api/rankings/:id
exports.getRankingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let ranking;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      ranking = await Ranking.findById(id);
    } else {
      ranking = await Ranking.findOne({ slug: id });
    }

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bảng xếp hạng'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lấy bảng xếp hạng thành công',
      data: ranking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new ranking
// @route   POST /api/rankings
exports.createRanking = async (req, res, next) => {
  try {
    const rankingData = { ...req.body };
    if (!rankingData.slug) {
      rankingData.slug = slugify(rankingData.title);
    }

    const ranking = await Ranking.create(rankingData);

    res.status(201).json({
      success: true,
      message: 'Tạo bảng xếp hạng thành công',
      data: ranking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update ranking
// @route   PATCH /api/rankings/:id
exports.updateRanking = async (req, res, next) => {
  try {
    const { id } = req.params;
    let ranking;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      ranking = await Ranking.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    } else {
      ranking = await Ranking.findOneAndUpdate({ slug: id }, req.body, { new: true, runValidators: true });
    }

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bảng xếp hạng để cập nhật'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật bảng xếp hạng thành công',
      data: ranking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete ranking
// @route   DELETE /api/rankings/:id
exports.deleteRanking = async (req, res, next) => {
  try {
    const { id } = req.params;
    let ranking;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      ranking = await Ranking.findByIdAndDelete(id);
    } else {
      ranking = await Ranking.findOneAndDelete({ slug: id });
    }

    if (!ranking) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bảng xếp hạng để xóa'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa bảng xếp hạng thành công',
      data: { id: ranking._id }
    });
  } catch (error) {
    next(error);
  }
};
