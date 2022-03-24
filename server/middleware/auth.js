const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
  console.log('heysachin', req.headers.authorization);
  let bearerToken;
  if (req.headers.authorization) {
    bearerToken = req.headers.authorization.replace('Bearer ', '');
  }
  console.log(req.body);
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    bearerToken;

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;
