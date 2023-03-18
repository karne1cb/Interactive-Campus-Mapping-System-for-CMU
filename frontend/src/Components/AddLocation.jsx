import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import LocationService from './LocationService.jsx';
import '../CSS/RequestAddLocation.css';

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
    const [isBuildingName, setIsBuildingName] = useState('');
    const [isInBuildingName, setIsInBuildingName] = useState('');

    const [isInBuilding, setIsInBuilding] = useState(false);
    const [roomNum, setRoomNum] = useState('');
    const [floorNum, setFloorNum] = useState('');

    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const [locLinks, setLocLinks] = useState([]);

    const navigate = useNavigate();


    // Event that handles if the location is a building or not
    const handleIsBuilding = () => {
        setIsBuilding(!isBuilding);
    };

    // Event that handles if the location is in a building or not
    const handleIsInBuilding = () => {
        setIsInBuilding(!isInBuilding);
    };
    //.replace('\\s', ).split(',') handles when the user enters a list of links

    const handleAddLocation = () => {
        console.log("Adding location...");
        LocationService.addLocation(locName, locDesc, longitude, latitude, locAddress, isBuilding, isBuildingName,
             isInBuilding, isInBuildingName, floorNum, roomNum, locLinks).then((res) => {
                // Log the sent request
                console.log("Status: " + res);
                if (res === 200) {
                    alert("Location added successfully!");
                    // Navigate to the home page
                    navigate('/');
                } else {
                    alert("Error adding location");
                }
            });
    };

    return (
        <div className="requestLocation">
            <h1>Add Location</h1>
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
                value="isBuilding"
                hidden={isInBuilding}
                onClick={(e) => handleIsBuilding(e.target.value)}
            />
            <label hidden={isInBuilding}> Is this a building? </label>
            {isBuilding & ! isInBuilding ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter Building Name"
                        value={isBuildingName}
                        onChange={(e) => setIsBuildingName(e.target.value)}
                    />
                </>
            ) : null}
             <input
                type="checkbox"
                id="isInBuilding"
                name="isInBuilding"
                value="isInBuilding"
                hidden={isBuilding}
                onClick={(e) => handleIsInBuilding(e.target.value)}
            />
            <label hidden={isBuilding}> Is this inside of a building? </label>
            {isInBuilding  & !isBuilding? (<>
                <input type="text"
                    placeholder="Enter Room Building Name"
                    value={isInBuildingName}
                    onChange={(e) => setIsInBuildingName(e.target.value)}
                />
                <input type="text"
                    placeholder="Enter Room Number"
                    value={roomNum}
                    onChange={(e) => setRoomNum(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter Floor Number"
                    value={floorNum}
                    onChange={(e) => setFloorNum(e.target.value)}
                />
            </>
            ) : null}
            <button className='pinLocationButton'>Pin Location</button>
            {// placeholder input that allows direct longitude and latitude input
            }
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
            <button className='addPointsButton'>Add Points</button>
            {
                // This is where shape and color will be selected later
            }
            <button className='addPictureButton'>Add Picture</button>
            <input
                type="text"
                placeholder="Enter Links (comma separated)"
                value={locLinks}
                onChange={(e) => setLocLinks(e.target.value)}
            />
            <button className='addLocationButton' onClick={handleAddLocation}>Add Location</button>
        </div>
    );
}