import React from 'react';

export default function SearchResult(props){
    const {_id, name, desc, lon, lat, childToParent} = props;
    return(
        <div className='searchResult' onClick={() => childToParent([_id, lat,lon])}>
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    );

}