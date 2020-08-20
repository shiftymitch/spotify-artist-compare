import React from "react";
import "./style.css";

function SearchForm(props) {
  return (
    <div className="search">
      <div className="col-2"></div>
      <form className="col-6">
        <div className="form-group mb-3">
          <input
            value={props.search}
            onChange={props.handleInputChange}
            name="search"
            list="results"
            type="text"
            className="form-control"
            placeholder="Search for an artist..."
            id={"search-" + props.count}
          />
          <button id={"search-btn-" + props.count} type="submit" onClick={props.handleFormSubmit} className="btn btn-outline-success form-control">
            Search
          </button>
        </div>
      </form>
      <div className="col-2 login-helper">
        <p id="lightbulb"><i className="fa fa-lightbulb-o" ></i></p>
        <p>Log in to Spotify.com to listen to full tracks.</p>
        
      </div>
    </div>
  );
}

export default SearchForm;
