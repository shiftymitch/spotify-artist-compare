import React from "react";
import "./style.css";

function SearchForm(props) {
  return (
    <form className="search text-center">
      <div className="form-group">
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
  );
}

export default SearchForm;
