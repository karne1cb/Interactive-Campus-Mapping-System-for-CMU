import React from 'react';
import '../CSS/SearchResult.css';

export default function SearchResult(props){
    const {_id, name, desc, lon, lat, selectedResultData} = props;
    return(
        <div className='searchResult' onClick={() => selectedResultData({_id:_id, name:name, lat:lat,lon:lon})}>
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    );

}