const { verify } = require('jsonwebtoken');
const { jwtConfig } = require('../../config/server');
const { User } = require('../../db/models');

module.exports = async (req, res, next) => {
  const { cookies: { token } } = req;

  try {
    const { userID } = verify(token, jwtConfig.secret);
    req.user = await User.findByPk(userID);
    req.user ?? res.clearCookie('token');
    next();
  } catch {
    next();
  }
};
