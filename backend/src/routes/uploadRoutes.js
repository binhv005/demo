const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const uploadController = require('../controllers/uploadController');

// POST /api/upload - single image upload field 'image'
router.post('/', upload.single('image'), uploadController.uploadImage);

// POST /api/upload/multiple - multiple images upload field 'images' (max 10)
router.post('/multiple', upload.array('images', 10), uploadController.uploadMultipleImages);

// POST /api/upload/sync-all - sync all database images to Cloudinary as WebP
router.post('/sync-all', uploadController.syncAllImages);

module.exports = router;
