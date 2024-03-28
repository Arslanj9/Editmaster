const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
    const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Forbidden - Admin access required' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your-secret-key'); 

    if (decodedToken.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
  } catch (error) {
    res.status(403).json({ message: 'Forbidden - Admin access required' });
  }
};

module.exports = checkAdmin;
