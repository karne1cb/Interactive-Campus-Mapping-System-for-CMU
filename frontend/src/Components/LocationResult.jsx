import { React, useEffect, useState } from 'react';
import LocationService from './LocationService';
import { useNavigate } from 'react-router';
import AuthService from './AuthService';
import '../CSS/LocationResult.css';

/**
 * Shows the result of a location search as a sidebar that covers the nav bar (same size as the nav bar and has an x button to close it)
 * @param {*} props 
 * @returns 
 */
export default function LocationResult(props) {
    const { locationID } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [locationData, setLocationData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (locationID === null) {
            setIsOpen(false);
            return;
        }
        // get location data from locationID via LocationService
        LocationService.getLocation(locationID).then((data) => {
            setLocationData(data);
        });
        setIsOpen(true);
        console.log('LocationResult: ' + locationID);
        AuthService.isAdmin().then(res => {
            let adminConst = res;
            //console.log(adminConst);
            if (adminConst === true) {
                setIsAdmin(true);
            }
            else {
                setIsAdmin(false);
            }
        });
    }, [locationID]);

    const handleDelete = () => {
        // add prompt to confirm delete
        if (window.confirm('Are you sure you want to delete this location?')) {
            LocationService.deleteLocation(locationID).then((data) => {
                console.log(data);
                setIsOpen(false);
            });
        }
        else alert('Location not deleted');
    }

    return (
        <div className={isOpen ? 'locationResult' : 'locationResultClosed'}>
            <div className='results'>
                <button className='closeButton' onClick={() => setIsOpen(false)}>X</button>
                <h3>{locationData.name}</h3>
                <p>{locationData.desc}</p>
                <p>{locationData.links}</p>
            </div>
            {
                isAdmin ? (
                    <div className='adminButtons'>
                        <button className='adminButton' onClick={() => { navigate('/EditLoc/' + locationID) }}>Edit</button>
                        <button className='adminButton' onClick={() => { handleDelete() }}>Delete</button>
                    </div>
                ) : null
            }
        </div>
    );
}