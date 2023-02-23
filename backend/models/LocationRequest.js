/**
 * LocationRequest model
 * Use the require function for use in other files
 */

const mongoose = require('mongoose');

const LocationRequestSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    lon: {type: Number, required: true},
    lat: {type: Number, required: true},
    shape: {type: String, required: true},
    color: {type: String, required: true},
    locImg: {type: String, required: true}, // image url/uri
    isBuilding: {type: Boolean, required: true},
    buildingId: {type: String, required: false}, // building id: only required if isBuilding is true
    isInBuilding: {type: Boolean, required: true}, // is this location inside a building?
    inBuildingId: {type: String, required: false}, // building id: only required if isInBuilding is true
    floor: {type: Number, required: false}, // floor number: only required if isInBuilding is true
    roomLoc: {type: String, required: false}, // room location: only required if isInBuilding is true
    links: [{type: String, required: true}], // array of links to other locations
    requestor: {type: String, required: true}, // original person that requested this location
});

module.exports = mongoose.model('LocationRequest', LocationRequestSchema);