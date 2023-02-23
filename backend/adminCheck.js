/**
 * This file is middleware to check whether a user is an admin
 */

const jwt = require('jsonwebtoken');
const secret = 'secretphrase';  //WARNING: In production, do this differently!
const User = require('./models/User.js');

const adminCheck = function(req, res, next) {
  const token = req.headers['x-access-token'];  // Tokens passed in x-access-token header

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.glbId = decoded.glbId;
        var glbId = decoded.glbId;
        User.findOne({ glbId }, function(err, user){
          // Check for Admin role on user
          if(user.role !== 'Admin'){
            res.status(401).send('Unauthorized: Not admin');
          } else {
            next();
          }
        });
      }
    });
  }
}
module.exports = adminCheck;