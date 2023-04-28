import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationService from './LocationService.jsx';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import '../CSS/AddEditLocation.css';

/**
 * A component that allows an admin to edit a location in the database
 * @returns The EditLocation component
 */
export default function EditLocation() {

    // State variables for the location
    const [locName, setLocName] = useState('');
    const [locDesc, setLocDesc] = useState('');
    const [locAddress, setLocAddress] = useState('');
    const [isBuilding, setIsBuilding] = useState(undefined);
    const [floorPlanLoc, setFloorPlanLoc] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
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

    /**
     * Handles updating a location in the database
     */
    const handleUpdateLocation = async () => {
        console.log("Updating location...");

        try {
            const res = await LocationService.updateLocation(lId, locName, locDesc, longitude, latitude, locAddress, locImg, isBuilding, floorPlanLoc, locLinks);
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

    /**
     * Handles when the user hits the goto button
     * Flies to the location on the map (if the location has a longitude and latitude)
     */
    const handleGotoButton = () => {
        if (longitude === 0 || latitude === 0 || longitude === null || latitude === null) {
            map.flyTo(centerLoc, defaultZoom);
        } else {
            map.flyTo([latitude, longitude], defaultZoom);
        }
    };

    /**
     * Gets location data from the database and sets the state variables
     */
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
            setLocImg(data.locImg);
            setIsBuilding(data.isBuilding);
            setFloorPlanLoc(data.floorPlanLoc);
            setLocLinks(data.links);
        });

    }, [lId, setLocName, setLocDesc, setLongitude, setCenterLoc, setLatitude, setLocAddress, setLocImg, setIsBuilding, setFloorPlanLoc, setLocLinks, locImg]);


    /**
     * Allows the user to click on the map to set the longitude and latitude of the location
     * @returns A marker on the map
     */
    const HandleMapClick = () => {
        useMapEvents({
            click: (e) => {
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
                //console.log("Latitude: " + e.latlng.lat + " Longitude: " + e.latlng.lng);
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

    /**
     * Handles when the name of a link is changed
     * @param {*} index The index of the link
     * @param {*} event The event that triggered the function
     * */
    const handleLinkNameChange = (index, event) => {
        const newName = event.target.value;
        const newLinks = [...locLinks];
        newLinks[index] = { name: newName, link: newLinks[index].link };
        setLocLinks(newLinks);
    };

    /**
     * Handles when the link of a link is changed
     * @param {*} index The index of the link
     * @param {*} event The event that triggered the function
     * */
    const handleLinkLinkChange = (index, event) => {
        const newLink = event.target.value;
        const newLinks = [...locLinks];
        newLinks[index] = { name: newLinks[index].name, link: newLink };
        setLocLinks(newLinks);
    };

    /**
     * Handles when the remove link button is clicked
     * Removes the link from the list of links
     * @param {*} index index of the link
     */
    const handleRemoveLink = (index) => {
        const newLinks = [...locLinks];
        newLinks.splice(index, 1);
        setLocLinks(newLinks);
    };
    
    /**
     * Handles when the add link button is clicked
     * Adds a new link to the list of links
     */
    const handleAddLink = () => {
        const newLinks = [...locLinks];
        newLinks.push({ name: '', link: '' });
        setLocLinks(newLinks);
    };

    return (
        <>
            <div className="locationForm">
                <h1>Edit a Location</h1>
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

                <div className='isBuildingCheckbox'>
                    <input
                        type="checkbox"
                        className="isBuildingCheckbox"
                        name="isBuilding-Checkbox"
                        defaultChecked={isBuilding}
                        onClick={(e) => handleIsBuilding(e.target.value)}
                    />
                    <label className='isBuildingCheckbox' id='checkboxLabel' htmlFor='checkbox'> Is this a building? </label>
                </div>
                <input
                    id={isBuilding ? 'floorPlanInput' : 'floorPlanInput-hidden'}
                    type="text"
                    placeholder="Enter Floor Plan Link"
                    value={floorPlanLoc}
                    onChange={(e) => setFloorPlanLoc(e.target.value)}
                />
                <div className="longladInput">
                    <label id='longitudeLabel'>Longitude: </label>
                    <input
                        id='longitudeInput'
                        type="number"
                        placeholder="Enter Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)} />
                    <label id='latitudeLabel'>Latitude: </label>
                    <input
                        id='latitudeInput'
                        type="number"
                        placeholder="Enter Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)} />
                </div>
                <div className="mapButtons">
                    <button className='addEditLocButton' id='gotoLoc' onClick={() => { handleGotoButton() }}>Goto pin</button>
                    <button className='addEditLocButton' id='returnToCenter' onClick={() => { map.flyTo(centerLoc, defaultZoom) }}>Back To CMU</button>
                </div>
                <div className="locationLinks-container">
                    <h3>Links:</h3>
                    <div className="locationLinks">
                        {locLinks.map((link, index) => (
                            <div className="link" key={index}>
                                <input
                                    id='linkNameInput'
                                    type="text"
                                    placeholder="Enter Link Name"
                                    value={link.name}
                                    onChange={(e) => handleLinkNameChange(index, e)}
                                />
                                <input
                                    id='linkLinkInput'
                                    type="text"
                                    placeholder="Enter Link"
                                    value={link.link}
                                    onChange={(e) => handleLinkLinkChange(index, e)}
                                />
                                <button id='removeLinkButton' onClick={() => handleRemoveLink(index)}>Remove Link</button>
                            </div>
                        ))}
                        <button className='addLinkButton' onClick={handleAddLink}>Add Link</button>
                    </div>
                </div>
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