import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Used to protect routes from unauthenticated users.
 * @param {*} param0 Component and any other props
 * @returns If user is logged in, returns the component. Otherwise, redirects to login page.
 */
function PrivateRoute({ Component, ...rest }) {
    const isAuthenticated = localStorage.getItem('user') !== null;
    return (
        isAuthenticated ? <>{<Component />}</> : <Navigate to="/login" />
    )
}

export default PrivateRoute;