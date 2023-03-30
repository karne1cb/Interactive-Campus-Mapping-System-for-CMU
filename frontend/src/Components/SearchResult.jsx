import React from 'react';

export default function SearchResult(props){
    const {name, desc, lon, lat, childToParent} = props;

    return(
        <div className='searchResult' onClick={() => childToParent([lon,lat])}>
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    );

}