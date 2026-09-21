const express = require('express');
const router = express.Router();
const comparisonController = require('../controllers/comparisonController');

router
  .route('/')
  .get(comparisonController.getComparisons)
  .post(comparisonController.createComparison);

router
  .route('/:id')
  .get(comparisonController.getComparisonById)
  .patch(comparisonController.updateComparison)
  .delete(comparisonController.deleteComparison);

module.exports = router;
