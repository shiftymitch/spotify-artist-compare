import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
  return (
      <div className="navbar navbar-expand-lg position-sticky">
        <div  className="navbar-brand">
          <img src="/spotify_icon.svg" id="spotify-icon" alt="spotify-icon"></img>
          <p id="navbar-name"><strong>Artist Compare</strong></p>
        </div>
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