const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validate = require('../middlewares/validate');
const { createCategorySchema, updateCategorySchema } = require('../validators/categoryValidator');

router
  .route('/')
  .get(categoryController.getCategories)
  .post(validate(createCategorySchema), categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .patch(validate(updateCategorySchema), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
