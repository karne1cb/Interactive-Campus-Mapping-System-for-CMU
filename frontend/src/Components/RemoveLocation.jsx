import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import '../CSS/RemoveLocation.css';

export default function RemoveLocation() {

    /*
    * This is where admins can remove locations from the database
    * This page will be accessed from the admin pmenu in the navbar
    * This page will have a search bar that will search for locations
    * Then, a list of locations will be displayed
    * The admin can then select a location to remove
    * The admin will then be prompted to confirm the removal
    * If the admin confirms, the location will be removed from the database
    */

    const [search, setSearch] = useState('');
    const [locations, setLocations] = useState([]);

    // for now, locations will be hard coded for testing the listing part
    // later, locations will be queried from the database
    useEffect(() => {
        setLocations([
            {
                id: 1,
                name: 'Location 1'
            },
            {
                id: 2,
                name: 'Location 2'
            },
            {
                id: 3,
                name: 'Location 3'
            },
            {
                id: 4,
                name: 'Location 4'
            }
        ]);
    }, []);

    return(
        <div className='removeLocation'>
            <h1>Remove Location</h1>
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button>Search</button>
            <div>
                <ul>
                    {locations.map((location) => (
                        <li key={location.id}>
                            <p>{location.name}</p>
                            <button>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}