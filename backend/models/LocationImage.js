/** 
 * Schema for LocationImage
 * Used to store images for a location
 */

const mongoose = require('mongoose');

const LocationImageSchema = new mongoose.Schema({
    img: {type: String, required: true}, // base64 image
});

module.exports = mongoose.model('LocationImage', LocationImageSchema);