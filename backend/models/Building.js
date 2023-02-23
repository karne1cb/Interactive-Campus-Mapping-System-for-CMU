/**
 * Building model
 * Use the require function for use in other files
 */

const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
    floorPlan : {type: String, required: true}, // image url/uri or pdf url/uri
    college : {type: String, required: true} // what college it belongs too (like "College of Engineering")
});

module.exports = mongoose.model('Building', BuildingSchema);