/**
 * The /location endpoint api
 */

const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const authCheck = require('../authCheck');
const adminCheck = require('../adminCheck');

/* @route   GET /location
* @desc    Get all locations
* @access  Public
*/

router.get('/', (req, res) => {
    Location.find()
        .then(locations => res.json(locations))
        .catch(err => res.status(404).json({success: false}));
});

/* @route   GET /location/:id
* @desc    Get a location by id
* @access  Public
*/

router.get('/:id', (req, res) => {
    Location.findById(req.params.id)
        .then(location => res.json(location))
        .catch(err => res.status(404).json({success: false}));
});

/* @route   GET /search/:name
* @desc    Search for a location by name
* @access  Public
*/

router.get('/search/:query', (req, res) => {
    const query = req.params.query;
    Location.find({
        $text: {
            $search: query
        }
    }, function(err, locations) {
        if (locations.length === 0) {
            res.status(204).send("No location was found with a keyword of: " + query + ".");
        }
        else if (!err){
            console.log("Found locations: " + locations);
            res.status(200).send(locations);
        }
        else {
            throw err;
        }
    })
});

/* @route   POST /location
* @desc    Create a new location
* @access  Private
*/

router.post('/', authCheck, adminCheck, (req, res) => {
    const newLocation = new Location({
        name: req.body.name,
        desc: req.body.desc,
        lon: req.body.lon,
        lat: req.body.lat,
        address: req.body.address,
        shape: req.body.shape,
        color: req.body.color,
        locImg: req.body.locImg,
        isBuilding: req.body.isBuilding,
        buildingId: req.body.buildingId,
        isInBuilding: req.body.isInBuilding,
        inBuildingId: req.body.inBuildingId,
        floor: req.body.floor,
        roomLoc: req.body.roomLoc,
        links: req.body.links,
        orgRequestor: req.body.orgRequestor
    });
    // Maybe add some middleware to check if the location is a building and then check to see if the buildingId is valid
    // also if the location is in a building then require the inBuildingId and floor and roomLoc

    newLocation.save()
        .then(location => res.status(200).send("Successfully added a new location: " + location.name))
        .catch(err => res.status(500).send("Error adding a location: " + err));
});

/* @route   PUT /location/:id
* @desc    Update a location
* @access  Private
*/

router.put('/:id', authCheck, adminCheck, (req, res) => {
    Location.findById(req.params.id)
        .then(location => {
            location.name = req.body.name;
            location.desc = req.body.desc;
            location.lon = req.body.lon;
            location.lat = req.body.lat;
            location.address = req.body.address;
            location.shape = req.body.shape;
            location.color = req.body.color;
            location.locImg = req.body.locImg;
            location.isBuilding = req.body.isBuilding;
            location.buildingId = req.body.buildingId;
            location.isInBuilding = req.body.isInBuilding;
            location.inBuildingId = req.body.inBuildingId;
            location.floor = req.body.floor;
            location.roomLoc = req.body.roomLoc;
            location.links = req.body.links;
            location.orgRequestor = req.body.orgRequestor;

            location.save()
                .then(location => res.json(location))
                .catch(err => res.status(404).json({success: false}));
        })
        .catch(err => res.status(404).json({success: false}));
});

/* @route   DELETE /location/:id
* @desc    Delete a location
* @access  Private
*/

router.delete('/:id', authCheck, adminCheck, (req, res) => {
    Location.findById(req.params.id)
        .then(location => location.remove()
            .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;