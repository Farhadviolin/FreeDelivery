const jwt = require('jsonwebtoken');
const SECRET = process.env.SIGNAL_SECRET || 'changeme';

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}

module.exports = { verifyToken };
