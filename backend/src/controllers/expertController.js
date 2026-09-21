const Expert = require('../models/Expert');

// @desc    Get all experts
// @route   GET /api/experts
exports.getExperts = async (req, res, next) => {
  try {
    const experts = await Expert.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách chuyên gia thành công',
      count: experts.length,
      data: experts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single expert by ID
// @route   GET /api/experts/:id
exports.getExpertById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expert = await Expert.findById(id);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin chuyên gia'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lấy thông tin chuyên gia thành công',
      data: expert
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new expert
// @route   POST /api/experts
exports.createExpert = async (req, res, next) => {
  try {
    const expert = await Expert.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Thêm chuyên gia thành công',
      data: expert
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update expert
// @route   PATCH /api/experts/:id
exports.updateExpert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expert = await Expert.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy chuyên gia để cập nhật'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin chuyên gia thành công',
      data: expert
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete expert
// @route   DELETE /api/experts/:id
exports.deleteExpert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expert = await Expert.findByIdAndDelete(id);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy chuyên gia để xóa'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa chuyên gia thành công',
      data: { id: expert._id }
    });
  } catch (error) {
    next(error);
  }
};
