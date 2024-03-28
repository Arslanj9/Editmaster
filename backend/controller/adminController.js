const User = require('../models/User');
const jwt = require('jsonwebtoken');
const checkAdmin = require('../middleware/checkAdmin');

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      // Check admin access using the checkAdmin middleware
      checkAdmin(req, res, async () => {
        const users = await User.find();
        res.json(users);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = adminController;
