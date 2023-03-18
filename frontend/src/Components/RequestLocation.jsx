import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import '../CSS/RequestAddLocation.css';

export default function RequestLocation() {

    /*
    * This component is used to request a location to be added to the map
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

    const [building, setBuilding] = useState(false);
    const [buildingName, setBuildingName] = useState('');
    const [roomNum, setRoomNum] = useState('');
    const [floorNum, setFloorNum] = useState('');

    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');


    // Event that handles if the location is a building or not
    const handleBuilding = () => {
        setBuilding(!building);
    };

    return (
        <div className="requestLocation">
            <h1>Request Location</h1>
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
            id="building" 
            name="building" 
            value="building" 
            onClick={(e) =>handleBuilding(e.target.value)} 
            />
            <label for="building"> Is this a building? </label>
            {building ? (
                <>
                    <input 
                    type="text" 
                    placeholder="Enter Building Name" 
                    value={buildingName}
                    onChange={(e) => setBuildingName(e.target.value)}
                    />
                    <input type="text" 
                    placeholder="Enter Room Number" 
                    value={roomNum}
                    onChange={(e) => setRoomNum(e.target.value)}
                    />
                    <input 
                    type="text" 
                    placeholder="Enter Floor Number" 
                    value={floorNum}
                    onChange={(e) => setFloorNum(e.target.value)}
                    />
                </>
            ) : null}
            <button className='pinLocationButton'>Pin Location</button>
            <button className='addPointsButton'>Add Points</button>
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
            <button className='addPictureButton'>Add Picture</button>
            <button className='addLinkButton'>Add Link</button>
            <button className='requestLocationButton'>Request Location</button>
        </div>
    );
}