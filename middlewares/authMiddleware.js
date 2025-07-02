const jwt = require('jsonwebtoken');


exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token,'token')
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
