import { React, useState } from 'react';
import { useLocation} from 'react-router';
//import { Link } from 'react-router-dom';
//import AuthService from './AuthService';
import '../CSS/SearchBar.css';

export default function SearchBar() {

    // event that handles if the search bar is closed or open
    const [open, setOpen] = useState(false);
    const pathname = useLocation().pathname;

    // function that toggles the search bar
    const toggleSearchBar = () => {
        setOpen(!open)
    };

    return (
        <>
            {pathname === '/login' ? null :
                <div>
                    <div className={open ? 'showSearchBar' : 'showSearchBarClosed'}>
                        <button className='showSearchButton' onClick={toggleSearchBar}>Hide</button>
                    </div>
                    <div className={open ? "searchBar" : "searchBarClosed"}>
                        <input type="text" placeholder="Search" />
                        <button className='searchButton'>Search</button>
                    </div>
                </div>
            }
        </>
    )
}