import React from 'react';
import '../CSS/SearchResult.css';

/**
 * Search result component that displays the name and description of a search result
 * @param {*} props data to be passed up to the search bar and data gotten from the search bar
 * @returns a search result component
 */
export default function SearchResult(props){
    const {_id, name, desc, lon, lat, selectedResultData} = props;
    return(
        <div className='searchResult' onClick={() => selectedResultData({_id:_id, name:name, lat:lat,lon:lon})}>
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    );

}