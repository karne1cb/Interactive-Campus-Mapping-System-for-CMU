import { React, useState } from 'react';
import { useLocation } from 'react-router';
//import { Link } from 'react-router-dom';
//import AuthService from './AuthService';
import '../CSS/SearchBar.css';

export default function SearchBar() {

    // event that handles if the search bar is closed or open
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const pathname = useLocation().pathname;

    const badPaths = ['/login', '/RequestLocTest', '/RemoveLoc', '/AddLoc'];
    // function that checks to see if the user is on a page that should not have the search bar
    const checkPath = () => {
        for (let i = 0; i < badPaths.length; i++) {
            if (pathname === badPaths[i]) {
                return true;
            }
        }
        return false;
    }

    // function that toggles the search bar
    const toggleSearchBar = () => {
        setOpen(!open)
    };

    // function that searches for the inputted text
    const search = () => {
        console.log(searchText);
    };

    return (
        <>
            {checkPath(pathname) ? null :
                <div>
                    <div className={open ? 'showSearchBar' : 'showSearchBarClosed'}>
                        <button className='showSearchButton' onClick={toggleSearchBar}>Hide</button>
                    </div>
                    <div className={open ? "searchBar" : "searchBarClosed"}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    search();
                                }
                            }
                            } />
                        <button className='searchButton' onClick={search}>Search</button>
                    </div>
                </div>
            }
        </>
    )
}