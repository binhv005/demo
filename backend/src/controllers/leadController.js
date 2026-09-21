const Lead = require('../models/Lead');

// @desc    Submit new Lead / Newsletter subscription (Public API)
// @route   POST /api/leads
exports.createLead = async (req, res, next) => {
  try {
    const { email, name, phone, website, service, message, source } = req.body;

    // Check if lead with this email already exists
    const existingLead = await Lead.findOne({ email: email.toLowerCase().trim() });

    if (existingLead) {
      // Update existing lead with latest message/service if provided
      if (message || phone || service) {
        existingLead.message = message || existingLead.message;
        existingLead.phone = phone || existingLead.phone;
        existingLead.service = service || existingLead.service;
        existingLead.status = 'new';
        await existingLead.save();
      }

      return res.status(200).json({
        success: true,
        message: 'Cảm ơn bạn! Thông tin đăng ký của bạn đã được cập nhật thành công.',
        data: existingLead
      });
    }

    const newLead = await Lead.create({
      email: email.toLowerCase().trim(),
      name: name?.trim() || '',
      phone: phone?.trim() || '',
      website: website?.trim() || '',
      service: service || 'Nhận bản tin & Deal tốt nhất',
      message: message?.trim() || '',
      source: source || 'homepage',
      status: 'new'
    });

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công! Cảm ơn bạn đã quan tâm đến TechReview.',
      data: newLead
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all leads (Admin API)
// @route   GET /api/leads
exports.getLeads = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách leads thành công',
      count: leads.length,
      data: leads
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
exports.getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lead'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lấy thông tin lead thành công',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead status / notes (Admin API)
// @route   PATCH /api/leads/:id
exports.updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lead để cập nhật'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật trạng thái lead thành công',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete lead (Admin API)
// @route   DELETE /api/leads/:id
exports.deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lead để xóa'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa lead thành công',
      data: { id: lead._id }
    });
  } catch (error) {
    next(error);
  }
};
