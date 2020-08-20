import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
  return (
      <div className="navbar navbar-expand-lg position-sticky">
        <div  className="navbar-brand">
          <img src="/spotify_icon.svg" id="spotify-icon" alt="spotify-icon"></img>
          <p id="navbar-name"><strong>Artist Compare</strong></p>
        </div>
        <a className="ml-auto mr-3" href="https://accounts.spotify.com/en/login/" target="popup" rel="noopener noreferrer" > 
          <button className="btn btn-sm btn-outline-success form-control ">
            Log in To Spotify
          </button>
        </a>
        <Link to={() => {
          if (window.location.pathname === "/compare") {
            return `/`;
          } else {
            return "/compare";
          }
        }}><button className="navbar-item btn btn-sm btn-outline-success mr-auto" id="compare" >Compare</button></Link>
      </div>
  );
}

export default Nav;