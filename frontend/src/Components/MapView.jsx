import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import AuthService from './AuthService';
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
    const [map, setMap] = useState(null); // State to grab the map

    const navDestData = (data) => { //Gets data all the way from search results
        // Check to see if the data changed from last time
        if (data.destination !== destination) {
            setNewDest(true);
            setDestination(data.destination);
        }
        else{
            setNewDest(false);
        }
        if (data.location !== location) {
            setNewLoc(true);
            setLocation(data.location);
        }
        else{
            setNewLoc(false);
        }
        console.log(data);
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

    // adds a marker to the map when a destination is selected
    const addDestMarker = () => {
        if (destination !== null) {
            console.log('dest ' + destination);
            if(newDest) map.flyTo(destination, defaultZoom);
            return (
                <Marker position={destination} icon={destIcon}>
                    <Popup>
                        <h3>{destination.name}</h3>
                    </Popup>
                </Marker>
            );
        }
    }

    const addLocMarker = () => {
        if (location!== null) {
            console.log('loc ' + location);
            if(newLoc)map.flyTo(location, defaultZoom);
            return (
                <Marker position={location}>
                    <Popup>
                        <h3>{location.name}</h3>
                    </Popup>
                </Marker>
            );
        }
    }

    return (
        <div id='navBar'>
            <NavBar navDestData={navDestData}/>
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
        </div>
    );
}