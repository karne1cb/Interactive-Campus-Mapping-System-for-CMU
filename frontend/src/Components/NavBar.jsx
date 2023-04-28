import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AuthService from './AuthService';
import '../CSS/NavBar.css';
import SearchBar from './SearchBar';

/**
 * Component that displays the nav bar on the left side of the screen
 * @param {*} props 
 * @returns 
 */
export default function NavBar(props) {

    // State variables
    const [loggedIn, setLoggedIn] = useState(false);
    const [fullName, setFullName] = useState('');
    const [globalId, setGlobalId] = useState('');
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { navDestData } = props
    const { pathname } = location;
    const [isAdmin, setIsAdmin] = useState(false); // Might want to make sure this is fine to be here

    // Function to pass data up from the search bar
    const searchBarData = (data) => {
        navDestData(data);
    }

    /**
     * Checks if the user is an admin
     */
    function isUserAdmin() {
        AuthService.isAdmin().then(res => {
            let adminConst = res;
            //console.log(adminConst);
            if (adminConst === true) {
                setIsAdmin(true);
                console.log(AuthService.authHeader());
            }
            else {
                setIsAdmin(false);
            }
        });
    }

    /**
     * Sets state variables when the component is first rendered
     * Checks if the user is an admin and displays the edit and delete buttons if they are
     * Also checks if the user is logged in
     */
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user !== null) {
            setLoggedIn(true);
            setGlobalId(user.globalId);
            setFullName(user.fName + ' ' + user.lName);
            isUserAdmin(); // Function here, since it was loading every time an action was taken
        } else {
            setLoggedIn(false);
        }
    }, [pathname]);

    /**
     * Handles when the user clicks the logout button
     */
    const handleLogout = () => {
        AuthService.logout();
        setLoggedIn(false);
        navigate('/login');
    };

    /**
     * Handles when the user clicks the login button (not really needed anymore, but here just in case)
     */
    const handleLogin = () => {
        navigate('/login');
    };

    /**
     * Toggles the nav bar between open and closed
     */
    const toggleSideNav = () => {
        setOpen(!open)
    };

    return (
        <div>
            <div className={open ? 'showSideNavBar' : 'showSideNavBarClosed'}>
                {/* <button onClick={toggleSideNav}>Hide</button> */}
                <img id='openTab' src="/images/opentab.png" alt="logo" onClick={toggleSideNav} />
            </div>
            <div className={open ? 'sideNavBar' : 'sideNavBarClosed'}>
                {loggedIn ? (
                    <>
                        <div className="logged-in">
                            <div className="logged-inElements">
                                <p>Welcome {fullName}!</p>
                                <button className='navButton' onClick={handleLogout}>Logout</button>
                                {/* This is where the favorites view will go (opens up over the nav bar*/}
                                <button className='navButton'>Favorites</button>
                            </div>
                            <div className="search">
                                <SearchBar searchBarData={searchBarData /* TODO: CHANGE THIS NAME */} />
                            </div>
                        </div>
                        <div className="otherButtons">
                            <div className="otherButtonsElements">
                            {/* This is where the admin tools will go (each will open a component over the navbar) */}
                            {isAdmin ? (
                                <div>
                                    <button
                                        className='navButton'
                                        onClick={
                                            () => {
                                                navigate('/AddLoc');
                                            }
                                        }
                                    >Add Location</button>
                                </div>
                            ) : (
                                <></>
                            )
                            }
                            <button className='navButton'>About</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="notLoggedIn">
                        <button className='navButton' onClick={handleLogin}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
}