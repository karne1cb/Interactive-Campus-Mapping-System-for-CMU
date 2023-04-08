import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import AuthService from './AuthService';
import MapDirectionService from './MapDirectionService';
import LocationService from './LocationService';
import LocationResult from './LocationResult';
import NavBar from './SideNavBar';
import '../CSS/MapView.css';
import 'leaflet/dist/leaflet.css';

// This is code that is needed to get the default leaflet markers to work
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const destIcon = L.icon({ // Custom marker icon for the destination marker
    iconUrl: require('../leaflet/icons/red-marker-icon.png'),
    iconRetinaUrl: require('../leaflet/icons/red-marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [13, 41]
});
// Use this: https://openrouteservice.org/dev/#/api-docs

// Changes where the zoom and zoom out buttons are located
const zoomControlPosition = 'bottomright';
var centerLoc = [43.5915541973643, -84.77518008037302];
var defaultZoom = 17;



export default function MapView() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(true);
    const { pathname } = useLocation();
    // State to update the map when a destination is selected
    const [destination, setDestination] = useState(null);
    const [location, setLocation] = useState(null);
    const [newDest, setNewDest] = useState(false);
    const [newLoc, setNewLoc] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [map, setMap] = useState(null); // State to grab the map
    const [dirLayer, setDirLayer] = useState(null); // State to grab the direction layer

    // This function returns the longitude and latitude of the destination
    // This does assume that the data is in the correct format (i.e. [long, lat])
    const parseNavData = (data) => {
        //console.log(data);
        return [data[1], data[2]];
    }

    // This function is called when the user gets directions
    const getWalkingDir= () => {
        //console.log(destination);
        //console.log(location);
        if (destination !== null && location !== null) {
            const dirService = new MapDirectionService();
            dirService.getWalkingDirections(location, destination)
            .then((data) => {
                //console.log(data); // Is in GeoJSON format
                // Now we need to add the GeoJSON to the map
                setDirLayer(L.geoJSON(data).addTo(map))
                //console.log(dirLayer);
            });
        }
    }

    // This function clears the map of all directions
    const clearDirections = () => {
        if (dirLayer !== null) {
            dirLayer.clearLayers();
            setDirLayer(null);
        }
    }

    const navDestData = (data) => { //Gets data all the way from search results
        // Check to see if the data changed from last time
        if (data.destination !== destination) {
            setNewDest(true);
            setDestination(data.destination);
            setLastUpdated('dest');
            clearDirections();
        }
        else {
            setNewDest(false);
        }
        if (data.location !== location) {
            setNewLoc(true);
            setLocation(data.location);
            setLastUpdated('loc');
            clearDirections();
        }
        else {
            setNewLoc(false);
        }
        getWalkingDir(); // ....
        //console.log(data);
    }

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    // useEffect(() => {
    //     const user = AuthService.getCurrentUser();
    //     if (user !== null) {
    //         setLoggedIn(true);
    //     } else {
    //         setLoggedIn(false);
    //     }
    //     // redirect to login if the user is not logged in
    //     console.log(loggedIn);
    //     if (!loggedIn) {
    //        navigate('/login');
    //     }
    // }, [pathname]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
    }, []);

    // adds a marker to the map when a destination is selected
    const addDestMarker = () => {
        if (destination !== null) {
            const destData = parseNavData(destination);
            if (newDest) map.flyTo(destData, defaultZoom, {duration: 1});
            //setUpdateDestRes(true);
            return (
                <Marker position={destData} icon={destIcon}>
                    <Popup>
                        <h3>{destData.name}</h3>
                    </Popup>
                </Marker>
            );
        }
    }

    const addLocMarker = () => {
        if (location !== null) {
            const locData = parseNavData(location);
            if (newLoc) map.flyTo(locData, defaultZoom);
            //setUpdateLocRes(true);
            return (
                <Marker position={locData}>
                    <Popup>
                        <h3>{locData.name}</h3>
                    </Popup>
                </Marker>
            );
        }
    }

    const addLocationResult = () => {
        if (lastUpdated === 'dest') {
            return (
                <LocationResult locationID={destination[0]}/>
            )
        }
        else if (lastUpdated === 'loc') {
            return (
                <LocationResult locationID={location[0]}/>
            )
        }
        else {
            return(
                <LocationResult locationID={null}/>
            );
        }
    }

    return (
        <>
            <div id='locationResult'>
                {addLocationResult()}
            </div>
            <div id='navBar'>
                <NavBar navDestData={navDestData} />
            </div>
            <div id="map">
                <MapContainer
                    center={centerLoc}
                    zoom={defaultZoom}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    ref={setMap}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {addDestMarker()}
                    {addLocMarker()}
                    <ZoomControl position={zoomControlPosition} />
                </MapContainer>
            </div>
        </>
    );
}