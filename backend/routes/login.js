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

// GET test code
// TODO: Determine if we still need this test code
router.get('/', function(req, res, next) {
  res.send("login endpoint");
});

// GET action to test whether user is authenticated
router.get('/authCheck', authCheck, function(req, res) {
  res.status(200).send();
});

// POST action for logging in to the site. Sends token to user upon successful authentication
router.post('/', function(req, res) {
  const { glbId, password } = req.body;
  User.findOne({ glbId }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      console.error("User" + glbId + "not found");
      res.status(401)
        .json({
          error: 'Incorrect global id or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          console.error("Incorrect pass");
          res.status(401)
            .json({
              error: 'Incorrect global id or password'
          });
        } else {
          // Issue token
          const payload = { glbId };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.status(200).send({accessToken: token})
        }
      });
    }
  });
});

module.exports = router;