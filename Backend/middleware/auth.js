const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { verifyToken, isAdmin };
