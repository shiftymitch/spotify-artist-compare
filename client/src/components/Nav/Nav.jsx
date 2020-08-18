import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
  return (
      <div className="navbar navbar-expand-lg position-sticky">
        <div  className="navbar-brand">
          <img src="/spotify_icon.svg" id="spotify-icon" alt="spotify-icon"></img>
          <p id="navbar-name"><strong>Artist Compare</strong></p>
        </div>
      </div>
  );
}

export default Nav;