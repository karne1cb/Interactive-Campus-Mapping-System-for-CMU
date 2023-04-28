import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import '../CSS/Login.css';

/**
 * Component for the login page
 * @returns a Login component
 */
export default function Login() {
    const [globalId, setGlobalId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    /**
     * Handles when the user submits the login form
     * @param {*} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(globalId, password);
            navigate('/map');
        } catch (e) {
            setError(e.response.data);
        }
    };

    return (
        <div className="login">
            <form id='loginForm' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="globalId"
                    value={globalId}
                    onChange={(e) => setGlobalId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}