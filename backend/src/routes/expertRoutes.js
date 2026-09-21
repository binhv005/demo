const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

router
  .route('/')
  .get(expertController.getExperts)
  .post(expertController.createExpert);

router
  .route('/:id')
  .get(expertController.getExpertById)
  .patch(expertController.updateExpert)
  .delete(expertController.deleteExpert);

module.exports = router;
