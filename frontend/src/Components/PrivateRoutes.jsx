import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Used to protect routes from unauthenticated users.
 * @param {*} param0 
 * @returns 
 */
function PrivateRoute({ Component, ...rest }) {
    const isAuthenticated = localStorage.getItem('user') !== null;
    return (
        isAuthenticated ? <>{<Component />}</> : <Navigate to="/login" />
    )
}

export default PrivateRoute;