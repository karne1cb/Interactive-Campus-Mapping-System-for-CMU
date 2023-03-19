import { React, useState } from 'react';
import { useLocation } from 'react-router';
//import { Link } from 'react-router-dom';
//import AuthService from './AuthService';
//import '../CSS/SearchBar.css';
import SearchService from './SearchService';

export default function SearchBar() {

    // event that handles if the search bar is closed or open
    const [destinationText, setDestinationText] = useState('');
    const [locationText, setLocationText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
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

    // function that searches for the inputted text
    const search = (query) => {
        console.log(query);
        const data = SearchService.searchLocation(query);
        data.then((data) => {
            console.log(data);
            const results = [];
            for (let i = 0; i < data.length; i++) {
                results.push([data[i].name, data[i].desc]);
            }
            setSearchResults(results);
        });
    };

    return (
        <>
            {checkPath(pathname) ? null :

                <div className='searchBar'>
                    <input
                        type="text"
                        placeholder="Destination"
                        value={destinationText}
                        onChange={(e) => setDestinationText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search(destinationText);
                            }
                        }
                        } />
                    <input
                        type="text"
                        placeholder="Location"
                        value={locationText}
                        onChange={(e) => setLocationText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search(locationText);
                            }
                        }
                        } />
                    {/* Adds a list of search results*/}
                    <div className='searchResults'>
                        <ul>
                            {
                                // add the results here
                                searchResults.map((result) => {
                                    return (
                                        <li>{
                                            // Only grab the first 3
                                            result[0] + ' - ' + result[1] + ' - ' + result[2]
                                        }</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}