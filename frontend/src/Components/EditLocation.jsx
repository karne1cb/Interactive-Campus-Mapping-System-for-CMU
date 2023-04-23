import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import LocationService from './LocationService.jsx';
import LocImgService from './LocImgService';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import '../CSS/RequestAddLocation.css';

export default function EditLocation() {

    /*
    * This component is used to edit a location on the map
    * */
    const [locName, setLocName] = useState('');
    const [locDesc, setLocDesc] = useState('');
    const [locAddress, setLocAddress] = useState('');

    const [isBuilding, setIsBuilding] = useState(false);
    const [floorPlanLoc, setFloorPlanLoc] = useState('');

    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    const [locImgID, setLocImgID] = useState('');
    const [locImg, setLocImg] = useState('');
    const [locLinks, setLocLinks] = useState(['']);

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    // Changes where the zoom and zoom out buttons are located
    const zoomControlPosition = 'bottomright';
    const [centerLoc, setCenterLoc] = useState([43.5915541973643, -84.77518008037302]);
    var defaultZoom = 17;
    const [map, setMap] = useState(null); // State to grab the map
    const regexId = /\/EditLoc\/(.*)/;
    const lId = regexId.exec(pathname)[1];


    // Event that handles if the location is a building or not
    const handleIsBuilding = () => {
        setIsBuilding(!isBuilding);
    };

    //.replace('\\s', ).split(',') handles when the user enters a list of links

    const handleUpdateLocation = async () => {
        console.log("Updating location...");
        const imgID = await handleUpdateLocImg(); // Update the image first
        if (imgID === null) {
            console.log("Image Error");
            return;
        }
        setLocImgID(imgID); // probably doesn't work still
        console.log(locImgID);
        try {
            const res = await LocationService.updateLocation(lId, locName, locDesc, longitude, latitude, locAddress, imgID, isBuilding, floorPlanLoc, locLinks);
            console.log("Status: " + res);
            if (res === 200) {
                alert("Location updated successfully!");
                navigate('/');
            } else {
                alert("Error updating location");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating location");
        }
    };

    const handleUpdateLocImg = async () => {
        console.log("Uploading image...");
        // Update the image first
        var imgID = locImgID;
        console.log(imgID);
        if (imgID == "" || imgID == null || imgID == " ") {
            try {
                const res = await LocImgService.addImage(locImg);
                imgID = res.data._id; // Set the locImgID to the new image id
                if (res.status === 200) {
                    console.log("Image added successfully!");
                } else {
                    alert("Error adding image");
                }
            } catch (error) {
                console.error(error);
                alert("Error adding image");
                return null;
            }
        }
        // Else, update the image
        else {
            try {
                const res = await LocImgService.updateImage(imgID, locImg);
                console.log("Status: " + res);
                if (res === 200) {
                    console.log("Image updated successfully!");
                } else {
                    alert("Error updating image");
                }
            } catch (error) {
                console.error(error);
                alert("Error updating image");
            }
        }
        return imgID;
    };

    const handleImage = () => {
        console.log("Adding picture...");
        
        // Change image into a base64 string
        const file = document.querySelector('input[type=file]').files[0];
        // Fist, make sure file is not too large
        if (file.size > 8000000) {
            alert("File is too large. Please choose a file that is less than 8MB");
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setLocImg(reader.result);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    };

    //Get the location data from the backend on when the page is first loaded
    useEffect(() => {
        if (lId === null) {
            alert("Error getting location id");
            return;
        }
        LocationService.getLocation(lId).then((data) => {
            console.log(data);
            setLocName(data.name);
            setLocDesc(data.desc);
            setLongitude(data.lon);
            setCenterLoc([data.lat, data.lon]);
            setLatitude(data.lat);
            setLocAddress(data.address);
            setLocImgID(data.locImg);
            setIsBuilding(data.isBuilding);
            setFloorPlanLoc(data.floorPlanLoc);
            setLocLinks(data.links);
            // Get the image
            console.log(locImgID);
            if (locImgID !== '' || locImgID !== ' ') {
                LocImgService.getImage(locImgID).then((data) => {
                    if (data === null || data === undefined || data === '') {
                        console.log("Error getting location image");
                        return;
                    }
                    setLocImg(data.img);
                });
            }
        });

    }, [lId, setLocName, setLocDesc, setLongitude, setCenterLoc, setLatitude, setLocAddress, setLocImgID, setIsBuilding, setFloorPlanLoc, setLocLinks, locImgID]);


    // Event that handles when the user clicks on the map (pins a location)
    const HandleMapClick = () => {
        useMapEvents({
            click: (e) => {
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
                console.log("Latitude: " + e.latlng.lat + " Longitude: " + e.latlng.lng);
            }
        });
        return (
            <Marker position={[latitude, longitude]}>
                <Popup>
                    <h3>Current Position</h3>
                </Popup>
            </Marker>
        );
    };

    // Event that handles when an image load error occurs
    const handleImageError = (e) => {
        // regex to remove everything after the last slash so that the if statement can work (if the image is not found, it will be replaced with the noimage.png image)
        const testStr = e.target.src.replace(/.*\//, '');
        if (testStr != 'noimage.png') e.target.src = '/images/noimage.png';
        console.log(e.target.src)
    };

    return (
        <>
            <div className="locationForm">
                <h1>Edit Location</h1>
                <input
                    type="text"
                    placeholder="Enter Location Name"
                    value={locName}
                    onChange={(e) => setLocName(e.target.value)} />
                <input
                    type="text"
                    placeholder="Enter Location Description"
                    value={locDesc}
                    onChange={(e) => setLocDesc(e.target.value)}
                />
                <input type="text"
                    placeholder="Enter Location Address"
                    value={locAddress}
                    onChange={(e) => setLocAddress(e.target.value)}
                />
                <input
                    type="checkbox"
                    id="isBuilding"
                    name="isBuilding"
                    defaultChecked={!isBuilding}
                    onClick={(e) => handleIsBuilding(e.target.value)}
                />
                <label> Is this a building? </label>
                {isBuilding ? (
                    <>
                        <input
                            type="text"
                            placeholder="Enter Floor Plan Link"
                            value={floorPlanLoc}
                            onChange={(e) => setFloorPlanLoc(e.target.value)}
                        />
                    </>
                ) : null}
                <input
                    type="number"
                    placeholder="Enter Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)} />
                <input
                    type="number"
                    placeholder="Enter Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)} />
                <button className='gotoLoc' onClick={() => { map.flyTo(centerLoc) }}>Goto pin</button>
                {
                    // This is where shape and color will be selected later
                }
                <img id="locImg" src={locImg} onError={handleImageError} />
                <input
                    type="file"
                    placeholder="Enter Location Image"
                    onChange={(e) => handleImage(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Links (comma separated)"
                    value={locLinks}
                    onChange={(e) => setLocLinks(e.target.value)}
                />
                <button className='updateLocationButton' onClick={handleUpdateLocation}>Update Location</button>
            </div>
            <div className="map">
                <MapContainer className="mapContainer"
                    center={centerLoc}
                    zoom={defaultZoom}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    ref={setMap}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position={zoomControlPosition} />
                    <HandleMapClick />
                </MapContainer>
            </div>
        </>
    );
}