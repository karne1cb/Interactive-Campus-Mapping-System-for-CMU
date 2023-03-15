import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
//import { Link } from 'react-router-dom';
import AuthService from './AuthService';
import '../CSS/SideNavBar.css';

export default function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [globalId, setGlobalId] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const [isAdmin, setIsAdmin] = useState(false); // Might want to make sure this is fine to be here

    // See if the user is an admin
    function isUserAdmin() {
        AuthService.isAdmin().then(res => {
            let adminConst = res;
            console.log(adminConst);
            if (adminConst === true) {
                setIsAdmin(true);
            }
            else {
                setIsAdmin(false);
            }
        });
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setLoggedIn(true);
            setGlobalId(user.globalId);
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
        navigate('/map');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const toggleSideNav = () => {
        setOpen(!open)
    };

    return (
        <>
            {pathname === '/login' ? null :
                <div>
                    <div className={open ? 'showSideNavBar' : 'showSideNavBarClosed'}>
                        <button onClick={toggleSideNav}>Hide</button>
                    </div>
                    <div className={open ? 'sideNavBar' : 'sideNavBarClosed'}>
                        {loggedIn ? (
                            <div className="logged-in">
                                <p>{globalId}</p>
                                <button onClick={handleLogout}>Logout</button>
                                {/* This is where the favorites view will go (opens up over the nav bar*/}
                                <button>Favorites</button>
                                <button>Request Location</button>

                                {/* This is where the admin tools will go (each will open a component over the navbar) */}

                                {isAdmin ? (
                                    <div>
                                        <button>Add Location</button>
                                        <button>Modify Locaiton</button>
                                        <button>Remove Locaiton</button>
                                    </div>
                                ) : (<div></div>)
                                }
                            </div>
                        ) : (
                            <div className="notLoggedIn">
                                <button onClick={handleLogin}>Login</button>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
}