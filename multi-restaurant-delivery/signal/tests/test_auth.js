const { verifyToken } = require('../auth');
const jwt = require('jsonwebtoken');

describe('JWT Auth', () => {
  const SECRET = 'changeme';
  it('accepts valid token', () => {
    const token = jwt.sign({ user: 'test' }, SECRET);
    expect(verifyToken(token)).toBeTruthy();
  });
  it('rejects invalid token', () => {
    expect(verifyToken('invalid')).toBeNull();
  });
});
