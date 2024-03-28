const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

// Auth Routes
router.use('/auth', authController);

module.exports = router;
