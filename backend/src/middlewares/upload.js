const multer = require('multer');

// Store file in memory buffer so we can stream directly to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận các định dạng tệp hình ảnh (JPG, PNG, WebP, GIF, SVG)!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Max 10MB
  }
});

module.exports = upload;
