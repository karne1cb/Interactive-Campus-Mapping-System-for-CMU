/**
 * This file is middleware to check whether user is authenticated with a token
 */
const jwt = require('jsonwebtoken');
const secret = 'secretphrase';  //WARNING: In production, do this differently!

/**
 * Function to check if a user is authenticated (has a valid token)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authCheck = function(req, res, next) {
  const token = req.headers['x-access-token']; // Tokens passed in x-access-token header
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.globalId = decoded.globalId;
        next();
      }
    });
  }
}

module.exports = authCheck;