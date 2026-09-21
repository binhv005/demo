const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validate = require('../middlewares/validate');
const { createProductSchema, updateProductSchema } = require('../validators/productValidator');

router
  .route('/')
  .get(productController.getProducts)
  .post(validate(createProductSchema), productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(validate(updateProductSchema), productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
