const express = require('express');
const adminController = require('../controller/adminController');
const checkAdmin = require('../middleware/checkAdmin');

const router = express.Router();

// Admin Routes
router.use('/admin', checkAdmin);

// Example admin route to get all users (admin access required)
router.get('/admin/users', adminController.getAllUsers);

module.exports = router;
