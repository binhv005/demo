const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');

router
  .route('/')
  .get(rankingController.getRankings)
  .post(rankingController.createRanking);

router
  .route('/:id')
  .get(rankingController.getRankingById)
  .patch(rankingController.updateRanking)
  .delete(rankingController.deleteRanking);

module.exports = router;
