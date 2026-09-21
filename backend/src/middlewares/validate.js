const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message || 'Validation error'
    });
  }
};

module.exports = validate;
