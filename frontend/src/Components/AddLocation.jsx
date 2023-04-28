import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationService from './LocationService.jsx';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import LocImgService from './LocImgService.jsx';
import '../CSS/AddEditLocation.css';

export default function AddLocation() {

    /*
    * This component is used to add a location to be added to the map
    * It will be a popup that will appear when the user clicks the button
    * on the side nav bar
    * It will have a text boxes for the user to enter the location name, description, and address (if applicable)
    * There also is a checkbox to select if the location is a building or not
    * If the location is a building, there will be more text boxes for the building name, room number, and floor number.
    * Then, there will be buttons that'll allow the user to pin where the location is on the map (get longitude and latitude)
    * Also, there'll be a button to add points on the map to outline the location
    * There will be a button to add a picture of the location (not implemented in the DB yet)
    * There will be a button to add links to websites about the location
    * Finally, there is a button to submit the request
    * The request will be sent to the backend and will be added to the database
    * The location will be added to the map once it is approved by an admin
    * */
    const [locName, setLocName] = useState('');
    const [locDesc, setLocDesc] = useState('');
    const [locAddress, setLocAddress] = useState('');

    const [isBuilding, setIsBuilding] = useState(false);
    const [floorPlanLoc, setFloorPlanLoc] = useState('');

    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const [locImgID, setLocImgID] = useState('');
    const [locImg, setLocImg] = useState('');
    const [locLinks, setLocLinks] = useState(['']);

    const navigate = useNavigate();

    // Changes where the zoom and zoom out buttons are located
    const zoomControlPosition = 'bottomright';
    const centerLoc = [43.5915541973643, -84.77518008037302]
    var defaultZoom = 17;
    const [map, setMap] = useState(null); // State to grab the map


    // Event that handles if the location is a building or not
    const handleIsBuilding = () => {
        setIsBuilding(!isBuilding);
    };

    //.replace('\\s', ).split(',') handles when the user enters a list of links

    const handleAddLocation = async () => {
        console.log("Adding location...");
        const imgID = await handleAddingLocImg(); // Update the image first
        if (imgID === null) {
            console.log("Image Error");
            return;
        }
        setLocImgID(imgID); // probably doesn't work still
        console.log(locImgID);
        try {
            const res = await LocationService.addLocation(locName, locDesc, longitude, latitude, locAddress, imgID, isBuilding, floorPlanLoc, locLinks);
            console.log("Status: " + res);
            if (res === 200) {
                alert("Location added successfully!");
                navigate('/');
            } else {
                alert("Error adding location");
            }
        } catch (err) {
            console.error(err);
            alert("Error adding location");
        }
    };

    const handleAddingLocImg = async () => {
        console.log("Uploading image...");
        // Update the image first
        var imgID = locImgID;
        console.log(imgID);

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

        return imgID;
    };

    // const handleImage = () => {
    //     console.log("Adding picture...");

    //     // Change image into a base64 string
    //     const file = document.querySelector('input[type=file]').files[0];
    //     // Fist, make sure file is not too large
    //     if (file.size > 8000000) {
    //         alert("File is too large. Please choose a file that is less than 8MB.");
    //         return;
    //     }
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         setLocImg(reader.result);
    //     };
    //     reader.onerror = (error) => {
    //         console.log('Error: ', error);
    //     };
    // };

    const handleGotoButton = () => {
        if (longitude === 0 || latitude === 0 || longitude === null || latitude === null) {
            map.flyTo(centerLoc, defaultZoom);
        } else {
            map.flyTo([latitude, longitude], defaultZoom);
        }
    };

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

    const handleLinkNameChange = (index, event) => {
        const newName = event.target.value;
        const newLinks = [...locLinks];
        newLinks[index] = { name: newName, link: newLinks[index].link };
        setLocLinks(newLinks);
    };

    const handleLinkLinkChange = (index, event) => {
        const newLink = event.target.value;
        const newLinks = [...locLinks];
        newLinks[index] = { name: newLinks[index].name, link: newLink };
        setLocLinks(newLinks);
    };

    const handleRemoveLink = (index) => {
        const newLinks = [...locLinks];
        newLinks.splice(index, 1);
        setLocLinks(newLinks);
    };

    const handleAddLink = () => {
        const newLinks = [...locLinks];
        newLinks.push({ name: '', link: '' });
        setLocLinks(newLinks);
    };

    // Event that handles when an image load error occurs
    // const handleImageError = (e) => {
    //     // regex to remove everything after the last slash so that the if statement can work (if the image is not found, it will be replaced with the noimage.png image)
    //     const testStr = e.target.src.replace(/.*\//, '');
    //     if (testStr != 'noimage.png') e.target.src = '/images/noimage.png';
    //     console.log(e.target.src)
    // };

    return (
        <>
            <div className="locationForm">
                <h1>Add a Location</h1>
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
                {/* <img id="locImg" src={locImg} onError={handleImageError} />
                <input
                    type="file"
                    placeholder="Enter Location Image"
                    onChange={(e) => handleImage(e.target.value)}
                /> */}

                <div className="locationLinks">
                    <h3>Links</h3>
                    {locLinks.map((link, index) => (
                        <div className="link" key={index}>
                            <input
                                type="text"
                                placeholder="Enter Link Name"
                                value={link.name}
                                onChange={(e) => handleLinkNameChange(index, e)}
                            />
                            <input
                                type="text"
                                placeholder="Enter Link"
                                value={link.link}
                                onChange={(e) => handleLinkLinkChange(index, e)}
                            />
                            <button className='removeLinkButton' onClick={() => handleRemoveLink(index)}>Remove Link</button>
                        </div>
                    ))}
                    <button className='addLinkButton' onClick={handleAddLink}>Add Link</button>
                </div>
                <button className='addEditLocButton' id='addEditButton' onClick={handleAddLocation}>Add Location</button>
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