import { React, useState } from 'react';
import { useLocation } from 'react-router';
//import { Link } from 'react-router-dom';
//import AuthService from './AuthService';
//import '../CSS/SearchBar.css';
import SearchService from './SearchService';
import SearchResult from './SearchResult';
import LocationResult from './LocationResult';

export default function SearchBar(props) {

    const { resultData } = props;

    // event that handles if the search bar is closed or open
    const [destinationText, setDestinationText] = useState('');
    const [locationText, setLocationText] = useState('');
    const [locSearch, setLocSearch] = useState(false); // false = destination, true = location
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultData, setSearchResultData] = useState({ destination: null, location: null });
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

    const childToParent = (data) => { //TODO: Change function name
        console.log('data: ' + String(data));
        var searchData = searchResultData;
        if (data !== null) {
            // Return data as json with the following format:
            // {destination: [lon, lat], location: [lon, lat]}
            console.log('SearchResultData before: ' + JSON.stringify(searchData));
            if (locSearch) { // true = location
                // get current
                if (searchData.destination === null) {
                    searchData = { destination: null, location: data };
                }
                else {
                    searchData = { destination: searchData.destination, location: data};
                }
            }
            else { // false = destination
                if (searchData.location === null) {
                    searchData = { destination: data, location: null };
                }
                else {
                    searchData = { destination: data, location: searchData.location };
                }
            }
            console.log('SearchResultData after: ' + JSON.stringify(searchData));
            resultData(searchData);
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

    return (
        <>
                <div className='searchBar'>
                    <input
                        className='directionsBar'
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
                    {/* Adds a list of search results*/}
                    <div className='searchResults'>
                        {
                            // add the results here
                            searchResults.map((result) => {
                                return (
                                    <SearchResult _id={result[0]} name={result[1]} desc={result[2]} lon={result[3]} lat={result[4]} childToParent={childToParent /* TODO: CHANGE THIS NAME */} />
                                );
                            })
                        }
                    </div>
                </div>
        </>
    )
}