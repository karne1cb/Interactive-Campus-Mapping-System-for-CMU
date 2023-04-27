import { React, useState } from 'react';
import { useLocation } from 'react-router';
//import { Link } from 'react-router-dom';
//import AuthService from './AuthService';
import '../CSS/SearchBar.css';
import SearchService from './SearchService';
import SearchResult from './SearchResult';

export default function SearchBar(props) {

    const { searchBarData } = props;

    // event that handles if the search bar is closed or open
    const [destinationText, setDestinationText] = useState('');
    const [locationText, setLocationText] = useState('');
    const [locSearch, setLocSearch] = useState(false); // false = destination, true = location
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultData, setSearchResultData] = useState({ destination: null, location: null });
    const [goButtonStatus, setGoButtonStatus] = useState(false);
    const pathname = useLocation().pathname;

    const badPaths = ['/login', '/RequestLocTest', '/RemoveLoc', '/AddLoc'];
    // function that checks to see if the user is on a page that should not have the search bar
    // TODO: remove this function as it is deprecated
    const checkPath = () => {
        for (let i = 0; i < badPaths.length; i++) {
            if (pathname === badPaths[i]) {
                return true;
            }
        }
        return false;
    }

    const selectedResultData = (data) => {
        var searchData = searchResultData;
        if (data !== null) {
            // Return data as json with the following format:
            // {destination: [lon, lat], location: [lon, lat]}
            var activeSearch =  ''; // Used to determine which search bar is active (destination or location); determines which search result to put on the screen.
            if (locSearch) { // true = location
                // get current
                if (searchData.destination === null) {
                    searchData = { destination: null, location: data };
                }
                else {
                    searchData = { destination: searchData.destination, location: data };
                }
                activeSearch = 'location';
            }
            else { // false = destination
                if (searchData.location === null) {
                    searchData = { destination: data, location: null };
                }
                else {
                    searchData = { destination: data, location: searchData.location };
                }
                activeSearch = 'destination';
            }
            searchData.goButtonStatus = goButtonStatus;
            searchData.active = activeSearch;
            searchData.date = Date();
            searchBarData(searchData);
            setSearchResultData(searchData);

        }
    }

    // function that searches for the inputted text
    const search = (query) => {
        //childToParent(null); // Clear the map
        console.log(query);
        const data = SearchService.searchLocation(query);
        data.then((data) => {
            console.log(data);
            const results = [];
            for (let i = 0; i < data.length; i++) {
                results.push([data[i]._id, data[i].name, data[i].desc, data[i].lon, data[i].lat]);
            }
            setSearchResults(results);
        });
    };

    const handleSearch = (e) => {
        setDestinationText(e.target.value);
        if (e.target.value === '') {
            setSearchResults([]);
        }
    }

    const handleGoButtonDown = () => {
        setGoButtonStatus(true);
        doOnGoButtonToggle();
    }

    const handleGoButtonUp = () => {
        setGoButtonStatus(false);
        doOnGoButtonToggle();
    }

    const doOnGoButtonToggle = () => {
        const tempSearchResultData = searchResultData;
        tempSearchResultData.goButtonStatus = goButtonStatus;
        tempSearchResultData.active = ''; // clear the active search (we do not want to show any search results)
        setSearchResultData(tempSearchResultData);
        searchBarData(searchResultData); // send the data to the parent
    }

    return (
        <>
            <div className='searchBar'>
                <input
                    className='directionsBar'
                    type="text"
                    placeholder="Location"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            search(locationText);
                            setLocSearch(true);
                        }
                    }
                    } />
                <div id='destinationDiv'>
                    <input
                        className='directionsBar'
                        id='destinationBar'
                        type="text"
                        placeholder="Destination"
                        value={destinationText}
                        onChange={(e) => handleSearch(e)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search(destinationText);
                                setLocSearch(false);
                            }
                        }
                        } />
                    <button id='goButton' onMouseDown={handleGoButtonDown} onMouseUp={handleGoButtonUp}>Go</button>
                </div>
                {/* Adds a list of search results*/}
                <div className='searchResults'>
                    {
                        // add the results here
                        searchResults.map((result) => {
                            return (
                                <SearchResult _id={result[0]} name={result[1]} desc={result[2]} lon={result[3]} lat={result[4]} selectedResultData={selectedResultData} />
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}