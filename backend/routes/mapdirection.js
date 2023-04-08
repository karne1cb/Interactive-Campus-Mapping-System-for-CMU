/**
 * Handles the routing service for the map
 */

const express = require('express');
const router = express.Router();
const authCheck = require('../authCheck');

// API key for the OpenRouteService
const key = '5b3ce3597851110001cf624869afdb0f9cb74e58996b6b3906de2df5'
const start = 0;
const end = 0;
const OldapiUrl = 'https://api.openrouteservice.org/v2/directions/foot-walking?api_key=' + key + '&start=' + start + '&end=' + end;
const apiUrl = 'https://api.openrouteservice.org/v2/directions/'
// get request to get the directions from the api when walking
router.get('/walking/:dir', authCheck, function (req, res) {
    const dir = req.params.dir;
    const splitDir = dir.split(','); // should split this into an array of 4
    if (splitDir.length != 4) {
        res.status(400).send("Invalid direction request");
        return;
    }
    const loc = splitDir[0] + ',' + splitDir[1];
    const dest = splitDir[2] + ',' + splitDir[3];
    const url = apiUrl + 'foot-walking?api_key=' + key + '&start=' + loc + '&end=' + dest;
    console.log(url);
    // send the request to the api
    fetch(url)
        .then(response => response.json())
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

module.exports = router;