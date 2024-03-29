/**
 * The Location schema
 * Use the require function for use in other files
 */

const mongoose = require('mongoose');

/**
 * The Link schema
 */
const LinkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    link: {type: String, required: true}
});

const LocationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    lon: {type: Number, required: true},
    lat: {type: Number, required: true},
    adress: {type: String, required: false},
    shape: {type: String, required: true},
    color: {type: String, required: true},
    locImg: {type: String, required: true}, // uri of the location image
    isBuilding: {type: Boolean, required: true},
    floorPlanLoc: {type: String, required: false}, // floorPlanLoc: only required if isBuilding is true and hasFloorPlan is true;
    links: [LinkSchema], // Schema for links to other locations
    orgRequestor: {type: String, required: true} // original person that requested this location
});

module.exports = mongoose.model('Location', LocationSchema);