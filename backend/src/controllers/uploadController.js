const cloudinary = require('../config/cloudinary');
const Product = require('../models/Product');
const Article = require('../models/Article');
const Expert = require('../models/Expert');
const Category = require('../models/Category');

const uploadBufferToCloudinary = (buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (!isCloudinaryConfigured) {
      const base64Data = `data:${mimetype};base64,${buffer.toString('base64')}`;
      return resolve({
        url: base64Data,
        secure_url: base64Data,
        format: 'webp'
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'techreview',
        resource_type: 'image',
        format: 'webp',
        transformation: [{ quality: 'auto:good', fetch_format: 'webp' }]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

const uploadUrlToCloudinary = async (imageUrl, folder = 'techreview') => {
  return await cloudinary.uploader.upload(imageUrl, {
    folder,
    resource_type: 'image',
    format: 'webp',
    transformation: [{ quality: 'auto:good' }, { fetch_format: 'webp' }]
  });
};

// @desc    Upload an image file directly to Cloudinary (always converted to WebP)
// @route   POST /api/upload
exports.uploadImage = async (req, res, next) => {
  try {
    const file = req.file || (req.files && req.files[0]);
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn tệp hình ảnh để tải lên!'
      });
    }

    const result = await uploadBufferToCloudinary(file.buffer, file.mimetype);

    return res.status(200).json({
      success: true,
      message: 'Tải ảnh lên Cloudinary thành công (định dạng WebP)!',
      url: result.secure_url || result.url,
      secure_url: result.secure_url || result.url,
      public_id: result.public_id,
      format: result.format || 'webp'
    });
  } catch (error) {
    console.error('[Cloudinary Single Upload Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Không thể tải ảnh lên Cloudinary',
      error: error.message
    });
  }
};

// @desc    Upload multiple image files directly to Cloudinary (always converted to WebP)
// @route   POST /api/upload/multiple
exports.uploadMultipleImages = async (req, res, next) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn ít nhất một tệp hình ảnh để tải lên!'
      });
    }

    // Upload all files in parallel
    const uploadPromises = files.map((file) =>
      uploadBufferToCloudinary(file.buffer, file.mimetype)
    );

    const results = await Promise.all(uploadPromises);
    const urls = results.map((r) => r.secure_url || r.url);

    return res.status(200).json({
      success: true,
      message: `Tải thành công ${results.length} ảnh lên Cloudinary (định dạng WebP)!`,
      urls,
      images: results.map((r) => ({
        url: r.secure_url || r.url,
        public_id: r.public_id,
        format: r.format || 'webp'
      }))
    });
  } catch (error) {
    console.error('[Cloudinary Multiple Upload Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Không thể tải nhiều ảnh lên Cloudinary',
      error: error.message
    });
  }
};

// @desc    Migrate & sync all database images to Cloudinary converted to WebP
// @route   POST /api/upload/sync-all
exports.syncAllImages = async (req, res, next) => {
  try {
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (!isCloudinaryConfigured) {
      return res.status(400).json({
        success: false,
        message: 'Chưa cấu hình tài khoản Cloudinary trong file .env (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).'
      });
    }

    let syncedCount = 0;
    const errors = [];

    // 1. Sync Product images
    const products = await Product.find();
    for (const product of products) {
      let isModified = false;

      // Product main image (if not cloudinary webp)
      if (product.image && (!product.image.includes('res.cloudinary.com') || !product.image.endsWith('.webp'))) {
        try {
          console.log(`[Cloudinary WebP Sync] Đồng bộ ảnh sản phẩm: ${product.name}`);
          const uploadRes = await uploadUrlToCloudinary(product.image, 'techreview/products');
          product.image = uploadRes.secure_url;
          isModified = true;
          syncedCount++;
        } catch (err) {
          errors.push(`Lỗi ảnh sản phẩm "${product.name}": ${err.message}`);
        }
      }

      // Product gallery images
      if (Array.isArray(product.gallery) && product.gallery.length > 0) {
        for (let i = 0; i < product.gallery.length; i++) {
          const item = product.gallery[i];
          if (item && (!item.includes('res.cloudinary.com') || !item.endsWith('.webp'))) {
            try {
              const uploadRes = await uploadUrlToCloudinary(item, 'techreview/products/gallery');
              product.gallery[i] = uploadRes.secure_url;
              isModified = true;
              syncedCount++;
            } catch (err) {
              errors.push(`Lỗi gallery sản phẩm "${product.name}": ${err.message}`);
            }
          }
        }
      }

      if (isModified) {
        await product.save();
      }
    }

    // 2. Sync Article images
    const articles = await Article.find();
    for (const article of articles) {
      let isModified = false;

      // Article cover image
      if (article.coverImage && (!article.coverImage.includes('res.cloudinary.com') || !article.coverImage.endsWith('.webp'))) {
        try {
          console.log(`[Cloudinary WebP Sync] Đồng bộ ảnh bìa bài viết: ${article.title}`);
          const uploadRes = await uploadUrlToCloudinary(article.coverImage, 'techreview/articles/covers');
          article.coverImage = uploadRes.secure_url;
          isModified = true;
          syncedCount++;
        } catch (err) {
          errors.push(`Lỗi ảnh bìa bài viết "${article.title}": ${err.message}`);
        }
      }

      // Article content blocks images
      if (Array.isArray(article.blocks)) {
        for (const block of article.blocks) {
          if (block && block.type === 'image' && block.url && (!block.url.includes('res.cloudinary.com') || !block.url.endsWith('.webp'))) {
            try {
              console.log(`[Cloudinary WebP Sync] Đồng bộ ảnh block bài viết: ${article.title}`);
              const uploadRes = await uploadUrlToCloudinary(block.url, 'techreview/articles/blocks');
              block.url = uploadRes.secure_url;
              isModified = true;
              syncedCount++;
            } catch (err) {
              errors.push(`Lỗi ảnh block bài viết "${article.title}": ${err.message}`);
            }
          }
        }
      }

      if (isModified) {
        await article.save();
      }
    }

    // 3. Sync Expert avatars
    const experts = await Expert.find();
    for (const expert of experts) {
      if (expert.avatar && (!expert.avatar.includes('res.cloudinary.com') || !expert.avatar.endsWith('.webp'))) {
        try {
          console.log(`[Cloudinary WebP Sync] Đồng bộ avatar chuyên gia: ${expert.name}`);
          const uploadRes = await uploadUrlToCloudinary(expert.avatar, 'techreview/experts');
          expert.avatar = uploadRes.secure_url;
          await expert.save();
          syncedCount++;
        } catch (err) {
          errors.push(`Lỗi avatar chuyên gia "${expert.name}": ${err.message}`);
        }
      }
    }

    // 4. Sync Category images
    const categories = await Category.find();
    for (const category of categories) {
      if (category.image && (!category.image.includes('res.cloudinary.com') || !category.image.endsWith('.webp'))) {
        try {
          console.log(`[Cloudinary WebP Sync] Đồng bộ ảnh danh mục: ${category.name}`);
          const uploadRes = await uploadUrlToCloudinary(category.image, 'techreview/categories');
          category.image = uploadRes.secure_url;
          await category.save();
          syncedCount++;
        } catch (err) {
          errors.push(`Lỗi ảnh danh mục "${category.name}": ${err.message}`);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: `Đã đồng bộ thành công ${syncedCount} ảnh sang định dạng WebP trên Cloudinary!`,
      syncedCount,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('[Cloudinary Sync All Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi đồng bộ ảnh lên Cloudinary',
      error: error.message
    });
  }
};
