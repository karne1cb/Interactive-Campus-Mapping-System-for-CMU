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
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Changes where the zoom and zoom out buttons are located
const zoomControlPosition = 'bottomright';
var testLoc = [43.58648802192152, -84.77606994103945];



export default function MapView() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(true);
    const { pathname } = useLocation();
    
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

    return (
        <div id='navBar'>
            <NavBar />
            <div id="map">
                <MapContainer center={testLoc} zoom={17} scrollWheelZoom={true} zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={testLoc}>
                        <Popup>
                            Pearce Hall
                        </Popup>
                    </Marker>
                    <ZoomControl position={zoomControlPosition} />
                </MapContainer>
            </div>
        </div>
    );
}