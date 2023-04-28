import { React, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import MapDirectionService from './MapDirectionService';
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
    const [lastDate, setlastDate] = useState(null);
    const [destination, setDestination] = useState(null);
    const [isDirectionsMapped, setisDirectionsMapped] = useState(false); // State to see if the directions have been mapped
    const [location, setLocation] = useState(null);
    const [newDest, setNewDest] = useState(false);
    const [newLoc, setNewLoc] = useState(false);
    const [lastClicked, setLastClicked] = useState(null);
    const [isLocationResultOpen, setIsLocationResultOpen] = useState(false);
    //const [doNavigation, setDoNavigation] = useState(false); // State to if the user pressed the 'Go' button
    const [map, setMap] = useState(null); // State to grab the map
    const [dirLayer, setDirLayer] = useState(null); // State to grab the direction layer

    // This function returns the longitude and latitude of the destination
    // This does assume that the data is in the correct format (i.e. [lat, long])
    const parseNavData = (data) => {
        //console.log(data);
        return [data.lat, data.lon];
    }

    // This function is called when the user gets directions
    const getWalkingDir = () => {
        if (destination !== null && location !== null) {
            const dirService = new MapDirectionService();
            dirService.getWalkingDirections(location, destination)
                .then((data) => {
                    // Now we need to add the GeoJSON to the map
                    setDirLayer(L.geoJSON(data).addTo(map))
                    setisDirectionsMapped(true);
                });
        }
    }

    // This function clears the map of all directions
    const clearDirections = () => {
        if (dirLayer !== null) {
            dirLayer.clearLayers();
            setDirLayer(null);
            setisDirectionsMapped(false);
        }
    }

    const navDestData = (data) => { //Gets data all the way from search results
        // Check to see if the data changed from last time
        // Better method?
        if (JSON.stringify(data.destination) !== JSON.stringify(destination)) {
            setNewDest(true);
            // check to see if the destination is the same as the location
            setDestination(data.destination);
            clearDirections();
        }
        else {
            setNewDest(false);
            // console.log(newDest);
        }

        if (JSON.stringify(data.location) !== JSON.stringify(location)) {
            // console.log(data.location);
            // console.log(location);
            setNewLoc(true);
            // check to see if the destination is the same as the location
            setLocation(data.location);
            clearDirections();
        }
        else {
            setNewLoc(false);
        }

        setLastClicked(data.active);
        setlastDate(data.date);

        // Before navigating, check to make sure destination and location are not the same
        if (destination !== location) {
            // Add logic to make sure that the directions are not already on the map
            // Now check to see if the Go button was pressed
            if (data.goButtonStatus && !isDirectionsMapped) {
                getWalkingDir();
            }
        }

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
            const destData = parseNavData(destination);
            if (newDest) map.flyTo(destData, defaultZoom, { duration: 1 });
            //setUpdateDestRes(true);
            return (
                <Marker position={destData} icon={destIcon}>
                    <Popup>
                        <h3>{destData.name}</h3>
                    </Popup>
                </Marker>
            );
        }
        else{
            return null;
        }
    }

    const addLocMarker = () => {
        if (location !== null) {
            const locData = parseNavData(location);
            if (newLoc) map.flyTo(locData, defaultZoom, { duration: 1 });
            //setUpdateLocRes(true);
            return (
                <Marker position={locData}>
                    <Popup>
                        <h3>{location.name}</h3>
                    </Popup>
                </Marker>
            );
        }
        else{
            return null;
        }
    }

    const addLocationResult = () => {
        if (lastClicked === 'destination') {
            return (
                <LocationResult key={`lastdateclicked-${lastDate}`} locationID={destination._id}/>
            )
        }
        else if (lastClicked === 'location') {
            return (
                <LocationResult key={`lastdateclicked-${lastDate}`} locationID={location._id}/>
            )
        }
        else {
            return (
                <LocationResult key={`lastdateclicked-${0}`} locationID={null}/>
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