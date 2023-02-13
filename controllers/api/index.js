const router = require('express').Router();
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
