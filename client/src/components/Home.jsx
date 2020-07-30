import React from 'react';
import SpotifySearch from "./SpotifySearch.jsx"

function Compare() {
  return (
      <div className="row ml-5 mr-5">
        <div className="col">
            <SpotifySearch artistCount="Search"/>
        </div>
      </div>
  );
}

export default Compare;