const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const validate = require('../middlewares/validate');
const { createLeadSchema, updateLeadSchema } = require('../validators/leadValidator');
const { leadSubmissionLimiter } = require('../middlewares/rateLimiter');

router
  .route('/')
  .post(leadSubmissionLimiter, validate(createLeadSchema), leadController.createLead)
  .get(leadController.getLeads);

router
  .route('/:id')
  .get(leadController.getLeadById)
  .patch(validate(updateLeadSchema), leadController.updateLead)
  .delete(leadController.deleteLead);

module.exports = router;
