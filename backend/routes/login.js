/**
 * This file is the /login api endpoint router
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const authCheck = require('../authCheck');

// Set up token use
const secret = 'secretphrase'; //WARNING: Store this secret in other ways for production (env variables or something like that)
const jwt = require('jsonwebtoken');

// Checks global id to make sure that it is valid
const validateGlobalId = (globalId) => {
  const pattern = RegExp(String.raw`^[a-z]{5}\d+[a-z]{2}`); //Global Id pattern
  return pattern.test(globalId);
}

// GET test code
// TODO: Determine if we still need this test code
router.get('/', function (req, res, next) {
  res.send("login endpoint");
});

// GET action to test whether user is authenticated
router.get('/authCheck', authCheck, function (req, res) {
  res.status(200).send();
});

// POST action for logging in to the site. Sends token to user upon successful authentication
router.post('/', function (req, res) {
  const { globalId, password } = req.body;
  // Validate global id
  if (!validateGlobalId(globalId)) {
    console.error("Invalid global id");
    res.status(401)
      .json({
        error: 'Incorrect global id or password'
      });
    return;
  }
  User.findOne({ globalId }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again e1'
        });
    } else if (!user) {
      console.error("User" + globalId + "not found");
      res.status(401)
        .json({
          error: 'Incorrect global id or password'
        });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again e2'
            });
        } else if (!same) {
          console.error("Incorrect pass");
          res.status(401)
            .json({
              error: 'Incorrect global id or password'
            });
        } else {
          // Issue token
          const payload = { globalId };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.status(200).send({ globalId, accessToken: token })
        }
      });
    }
  });
});

module.exports = router;