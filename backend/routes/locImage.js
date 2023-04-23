const express = require('express');
const router = express.Router();
var path = require('path');

const Location = require('../models/Location');
const LocationImage = require('../models/LocationImage');
const authCheck = require('../authCheck');
const adminCheck = require('../adminCheck');

/* @route   GET /image/:id
* @desc    Get a location image by id
* @access  Public
*/

router.get('/:id', (req, res) => {
    LocationImage.findById(req.params.id)
        .then(locationImage => res.send(locationImage))
        .catch(err => res.status(404).json({success: false}));
});

/* @route   POST /image
* @desc    Create a new location image
* @access  Private
*/

router.post('/', authCheck, adminCheck, (req, res) => {
    const newLocationImage = new LocationImage({
        img: req.body.img
    });

    newLocationImage.save()
        .then(locationImage => res.status(200).send(locationImage._id))
        .catch(err => res.status(404).json({success: false}));
});

/* @route   PUT /image/:id
* @desc    Update a location image by id
* @access  Private
*/

router.put('/:id', authCheck, adminCheck, (req, res) => {
    LocationImage.findById(req.params.id)
        .then(locationImage => {
            locationImage.img = req.body.img;
        })
        .catch(err => res.status(404).json({success: false}));
});

/* @route   DELETE /image/:id
* @desc    Delete a location image by id
* @access  Private
*/

router.delete('/:id', authCheck, adminCheck, (req, res) => {
    LocationImage.findById(req.params.id)
        .then(locationImage => locationImage.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;