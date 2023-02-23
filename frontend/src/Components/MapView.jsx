import React from 'react';
import { Link } from 'react-router-dom';

// For now, just a placeholder for the map view.
export default function MapView() {
    return (
        <div className="map">
            <h1>Map View</h1>
            <Link to="/login">
                    <p className="icon-text" style={{margin: "0"}}>Log in</p>
                </Link>
        </div>
    );
}