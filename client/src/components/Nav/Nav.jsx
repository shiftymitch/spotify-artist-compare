import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
  return (
      <div className="navbar navbar-expand-lg position-sticky justify-content-between">
        <p className="navbar-brand ml-5 mr-5"><img src="/spotify_icon.png" alt="spotify-icon"></img><strong className="ml-3">Spotify Artist Compare</strong></p>
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