const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const rankingRoutes = require('./rankingRoutes');
const comparisonRoutes = require('./comparisonRoutes');
const articleRoutes = require('./articleRoutes');
const expertRoutes = require('./expertRoutes');
const leadRoutes = require('./leadRoutes');
const statsRoutes = require('./statsRoutes');
const seedRoutes = require('./seedRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/rankings', rankingRoutes);
router.use('/comparisons', comparisonRoutes);
router.use('/articles', articleRoutes);
router.use('/experts', expertRoutes);
router.use('/leads', leadRoutes);
router.use('/stats', statsRoutes);
router.use('/seed', seedRoutes);
router.use('/upload', uploadRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Top20Product Backend API is running smoothly 🚀',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
