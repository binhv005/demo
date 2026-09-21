const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const cloudinary = require('../config/cloudinary');
const Product = require('../models/Product');
const Article = require('../models/Article');
const Expert = require('../models/Expert');
const Category = require('../models/Category');

const uploadUrlToCloudinary = async (imageUrl, folder = 'techreview') => {
  return await cloudinary.uploader.upload(imageUrl, {
    folder,
    resource_type: 'image',
    format: 'webp',
    transformation: [{ quality: 'auto:good', fetch_format: 'webp' }]
  });
};

async function syncAllToCloudinaryWebp() {
  const isCloudinaryConfigured =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

  if (!isCloudinaryConfigured) {
    console.error('❌ Lỗi: Bạn chưa cấu hình thông tin Cloudinary trong file backend/.env');
    console.error('   Vui lòng thêm:');
    console.error('   CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.error('   CLOUDINARY_API_KEY=your_api_key');
    console.error('   CLOUDINARY_API_SECRET=your_api_secret');
    process.exit(1);
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techreview';
  console.log(`🔌 Đang kết nối tới MongoDB: ${mongoUri}`);
  await mongoose.connect(mongoUri);
  console.log('✅ Đã kết nối MongoDB thành công!');
  console.log('🚀 Bắt đầu quá trình đồng bộ toàn bộ ảnh sang định dạng WebP trên Cloudinary...\n');

  let syncedCount = 0;
  let skippedCount = 0;
  const errors = [];

  try {
    // 1. Products
    console.log('📦 Đang kiểm tra ảnh Sản phẩm...');
    const products = await Product.find();
    for (const product of products) {
      let isModified = false;

      // Main image
      if (product.image) {
        if (!product.image.includes('res.cloudinary.com') || !product.image.endsWith('.webp')) {
          try {
            console.log(`  -> Đồng bộ ảnh chính: "${product.name}"`);
            const res = await uploadUrlToCloudinary(product.image, 'techreview/products');
            product.image = res.secure_url;
            isModified = true;
            syncedCount++;
          } catch (err) {
            console.warn(`  ⚠️ Thất bại khi upload "${product.image}":`, err.message);
            errors.push(`Product [${product.name}] main: ${err.message}`);
          }
        } else {
          skippedCount++;
        }
      }

      // Gallery
      if (Array.isArray(product.gallery) && product.gallery.length > 0) {
        for (let i = 0; i < product.gallery.length; i++) {
          const item = product.gallery[i];
          if (item && (!item.includes('res.cloudinary.com') || !item.endsWith('.webp'))) {
            try {
              console.log(`  -> Đồng bộ gallery [${i + 1}]: "${product.name}"`);
              const res = await uploadUrlToCloudinary(item, 'techreview/products/gallery');
              product.gallery[i] = res.secure_url;
              isModified = true;
              syncedCount++;
            } catch (err) {
              console.warn(`  ⚠️ Thất bại khi upload gallery "${item}":`, err.message);
              errors.push(`Product [${product.name}] gallery [${i}]: ${err.message}`);
            }
          } else {
            skippedCount++;
          }
        }
      }

      if (isModified) {
        await product.save();
      }
    }

    // 2. Articles
    console.log('\n📝 Đang kiểm tra ảnh Bài viết...');
    const articles = await Article.find();
    for (const article of articles) {
      let isModified = false;

      if (article.coverImage) {
        if (!article.coverImage.includes('res.cloudinary.com') || !article.coverImage.endsWith('.webp')) {
          try {
            console.log(`  -> Đồng bộ ảnh bìa: "${article.title}"`);
            const res = await uploadUrlToCloudinary(article.coverImage, 'techreview/articles/covers');
            article.coverImage = res.secure_url;
            isModified = true;
            syncedCount++;
          } catch (err) {
            console.warn(`  ⚠️ Thất bại khi upload cover "${article.coverImage}":`, err.message);
            errors.push(`Article [${article.title}] cover: ${err.message}`);
          }
        } else {
          skippedCount++;
        }
      }

      if (Array.isArray(article.blocks)) {
        for (const block of article.blocks) {
          if (block && block.type === 'image' && block.url) {
            if (!block.url.includes('res.cloudinary.com') || !block.url.endsWith('.webp')) {
              try {
                console.log(`  -> Đồng bộ ảnh block: "${block.caption || block.url}"`);
                const res = await uploadUrlToCloudinary(block.url, 'techreview/articles/blocks');
                block.url = res.secure_url;
                isModified = true;
                syncedCount++;
              } catch (err) {
                console.warn(`  ⚠️ Thất bại khi upload block image "${block.url}":`, err.message);
                errors.push(`Article block [${block.url}]: ${err.message}`);
              }
            } else {
              skippedCount++;
            }
          }
        }
      }

      if (isModified) {
        await article.save();
      }
    }

    // 3. Experts
    console.log('\n👤 Đang kiểm tra avatar Chuyên gia...');
    const experts = await Expert.find();
    for (const expert of experts) {
      if (expert.avatar) {
        if (!expert.avatar.includes('res.cloudinary.com') || !expert.avatar.endsWith('.webp')) {
          try {
            console.log(`  -> Đồng bộ avatar: "${expert.name}"`);
            const res = await uploadUrlToCloudinary(expert.avatar, 'techreview/experts');
            expert.avatar = res.secure_url;
            await expert.save();
            syncedCount++;
          } catch (err) {
            console.warn(`  ⚠️ Thất bại khi upload avatar "${expert.avatar}":`, err.message);
            errors.push(`Expert [${expert.name}]: ${err.message}`);
          }
        } else {
          skippedCount++;
        }
      }
    }

    // 4. Categories
    console.log('\n📂 Đang kiểm tra ảnh Danh mục...');
    const categories = await Category.find();
    for (const category of categories) {
      if (category.image) {
        if (!category.image.includes('res.cloudinary.com') || !category.image.endsWith('.webp')) {
          try {
            console.log(`  -> Đồng bộ ảnh danh mục: "${category.name}"`);
            const res = await uploadUrlToCloudinary(category.image, 'techreview/categories');
            category.image = res.secure_url;
            await category.save();
            syncedCount++;
          } catch (err) {
            console.warn(`  ⚠️ Thất bại khi upload category image "${category.image}":`, err.message);
            errors.push(`Category [${category.name}]: ${err.message}`);
          }
        } else {
          skippedCount++;
        }
      }
    }

    console.log('\n=========================================');
    console.log(`🎉 HOÀN TẤT ĐỒNG BỘ ẢNH LÊN CLOUDINARY (WEBP)!`);
    console.log(`✅ Số lượng ảnh đã đồng bộ mới: ${syncedCount}`);
    console.log(`⏭️  Số lượng ảnh đã là Cloudinary WebP (bỏ qua): ${skippedCount}`);
    if (errors.length > 0) {
      console.log(`⚠️  Số lượng lỗi: ${errors.length}`);
      errors.forEach((e) => console.log(`   - ${e}`));
    }
    console.log('=========================================\n');
  } catch (error) {
    console.error('❌ Lỗi trong quá trình đồng bộ:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

syncAllToCloudinaryWebp();
