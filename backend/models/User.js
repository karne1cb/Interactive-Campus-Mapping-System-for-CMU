/**
 * The User schema
 * Use the require function for use in other files
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Not sure what this does rn...

const UserSchema = new mongoose.Schema({
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    globalId: {type: String, required: true, unique: true}, // Global ID
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    favLocs: [{type: String, required: true}]
})

// This function hasehs the password before saving it to the database
UserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to 'this' because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// This function checks to see if the password is correct
UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

module.exports = mongoose.model('User', UserSchema);