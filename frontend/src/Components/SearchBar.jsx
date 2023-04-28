import { React, useState } from 'react';
import SearchService from './SearchService';
import SearchResult from './SearchResult';
import '../CSS/SearchBar.css';

/**
 * Component for the search bar
 * @param {*} props
 * @returns a component for the search bar
 */
export default function SearchBar(props) {

    const { searchBarData } = props; // Data that is passed from search results all the way to the mapview component
    // State variables
    const [destinationText, setDestinationText] = useState('');
    const [locationText, setLocationText] = useState('');
    const [locSearch, setLocSearch] = useState(true); // false = destination, true = location
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultData, setSearchResultData] = useState({ destination: null, location: null });
    const [goButtonStatus, setGoButtonStatus] = useState(false);

    /**
     * Handles if a user clicks on a search result
     * @param {*} data data from the search result
     */
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

    /**
     * function that searches for the inputted text
     * @param {*} query A query to be searched for (either a location or a destination)
     */
    const search = (query) => {
        const data = SearchService.searchLocation(query);
        data.then((data) => {
            const results = [];
            for (let i = 0; i < data.length; i++) {
                results.push([data[i]._id, data[i].name, data[i].desc, data[i].lon, data[i].lat]);
            }
            setSearchResults(results);
        });
    };

    /**
     * Handles when searching for a location
     * @param {*} e 
     */
    const handleLocSearch = (e) => {
        // Sets the text of the search bar
        setLocationText(e.target.value);
        // if the search bar is empty, clear the search results
        if (e.target.value.trim() === '') {
            setSearchResults([]);
        }
    }

    /**
     * Handles when searching for a destination
     * @param {*} e
     */
    const handleDestSearch = (e) => {
        // Sets the text of the search bar
        setDestinationText(e.target.value);
        // if the search bar is empty, clear the search results
        if (e.target.value.trim() === '') {
            setSearchResults([]);
        }
    }

    /**
     * Handles when the go button is pressed down
     * @param {*} e
     */
    const handleGoButtonDown = () => {
        setGoButtonStatus(true);
        doOnGoButtonToggle();
    }
    /**
     * Handles when the go button is depressed
     * @param {*} e
     */
    const handleGoButtonUp = () => {
        setGoButtonStatus(false);
        doOnGoButtonToggle();
    }

    /**
     * Handles when the go button is toggled
     * @param {*} e
     */
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
                    onChange={(e) => handleLocSearch(e)}
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
                        onChange={(e) => handleDestSearch(e)}
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