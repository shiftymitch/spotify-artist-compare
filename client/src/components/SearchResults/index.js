import React from "react";
import "./style.css";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function SearchResults(props) {
  function image() {
    if (props.results[0].images[0]) {
      return props.results[0].images[0].url;
    } else {
      return "";
    }
  }
  
  return (
    <div className="d-flex justify-content-around">
      <ul className="search-results">
        {props.results.slice(0, 1).map(result => (
          <li key={result.id} className="list-group-item">
            <div className="row">  
              <div className="col-4">
                <a target="_blank" rel="noopener noreferrer" href={result.external_urls.spotify}><img className="img-fluid" src={image()} alt={result.name}></img></a>
              </div>
              <div className="col">
                <h5><a target="_blank" rel="noopener noreferrer" href={result.external_urls.spotify}>{result.name}</a></h5>
                <p><strong>Followers: </strong>{numberWithCommas(result.followers.total)}</p>
                <p><strong>Popularity: </strong>{result.popularity}</p>
                <p><strong>Genres: </strong>{result.genres.join(", ")}</p>
              </div> 
            </div>
            <hr></hr>
            <div className="row">
              <div className="col">
                <ul className="track-results mb-5">
                  <h5>Top Tracks:</h5>
                  {props.topTracks.map(track => (
                    <li key={track.id} className="list-group-item"><a href={track.external_urls.spotify}>{track.name}</a></li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <ul className="related-artists mb-5">
                  <h5>Related Artists:</h5>
                  {props.relatedArtists.map(artist => (
                    <li key={artist.id} className="list-group-item"><a href={artist.external_urls.spotify}>{artist.name}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
