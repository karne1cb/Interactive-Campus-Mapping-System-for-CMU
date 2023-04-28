import { React, useEffect, useState, useRef } from 'react';
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

    const handleLinks = () => {
        if (locationData.links === null || locationData.links === undefined) return;
        return locationData.links.map((link, index) => {
            return (
                <a className='locationResText' key={index} id='link' href={link.link}>{link.name}</a>
            );
        });
    }

    return (
        <div className={isOpen ? 'locationResult' : 'locationResultClosed'}>
            <div id='locationData'>
                <button className='locResButton' id='closeButton' onClick={() => { setIsOpen(false) }}>X</button>
                <img id='locImgRes' src={'img_uploads/' + locationData.locImg}></img>
                <h3>{locationData.name}</h3>
                <p className='locResText' id='desc'>{locationData.desc}</p>
                <div id='locationResLinkedText'>
                    {handleLinks()}
                    <a className='locResText' id='floorplan' href={locationData.floorPlanLoc}>Floor Plan</a>
                </div>
            </div>
            <div id='locResButtons'>
                {
                    isAdmin ? (
                        <div className='adminButtons'>
                            <button className='locResButton' onClick={() => { navigate('/EditLoc/' + locationID) }}>Edit</button>
                            <button className='locResButton' onClick={() => { handleDelete() }}>Delete</button>
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}