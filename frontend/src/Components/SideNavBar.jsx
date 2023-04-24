import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
//import { Link } from 'react-router-dom';
import AuthService from './AuthService';
import '../CSS/SideNavBar.css';
import SearchBar from './SearchBar';

export default function NavBar(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [fullName, setFullName] = useState('');
    const [globalId, setGlobalId] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { navDestData } = props
    const { pathname } = location;
    const [isAdmin, setIsAdmin] = useState(false); // Might want to make sure this is fine to be here

    const childToParent = (data) => {
        //setClickedResults(data);
        navDestData(data);
    }

    // See if the user is an admin
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

    useEffect(() => {
        //wait a second to see if the user is logged in

        const user = AuthService.getCurrentUser();
        if (user !== null) {
            setLoggedIn(true);
            setGlobalId(user.globalId);
            setFullName(user.fName + ' ' + user.lName);
            isUserAdmin(); // Function here, since it was loading every time an action was taken
        } else {
            setLoggedIn(false);
        }
        // close the navbar if the user is on the login page
        if (pathname === '/login') {
            setOpen(false);
        }
    }, [pathname]);

    const handleLogout = () => {
        AuthService.logout();
        setLoggedIn(false);
    };

    const handleLogin = () => {
        navigate('/login');
    };

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
                                <SearchBar resultData={childToParent /* TODO: CHANGE THIS NAME */} />
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
                            ) : (<div>
                                <button
                                    className='navButton'
                                    onClick={
                                        () => {
                                            navigate('/RequestLocTest');
                                        }
                                    }>Request Location</button>
                            </div>)
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