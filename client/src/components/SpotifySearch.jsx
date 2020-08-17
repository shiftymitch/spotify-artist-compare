import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from "./Container";
import SearchForm from "./SearchForm";

const SpotifySearch = props => {
  const [token, setToken] = useState([]);
  const [search, setSearch] = useState();
  const [results, setResults] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    axios
      .get('/api/token')
      .then(res => {
        setToken(res.data.token);
      })
      .catch(e => console.log(e));
  }, []);

  function handleInputChange(event) {
    setSearch(event.target.value);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    
    // Artist Search
    axios.get(
      "https://api.spotify.com/v1/search?q="
      + search
      +"&type=artist"
      +"&access_token="
      +token
    )
      .then(res => {
        setResults(res.data.artists.items.filter(filtered => filtered.name.length === search.length));
        
        // Get Top Tracks
        axios.get(
          "https://api.spotify.com/v1/artists/"
          + res.data.artists.items[0].id
          +"/top-tracks?"
          +"country=US"
          +"&access_token="
          +token
        )
          .then(res2 => {
            setTopTracks(res2.data.tracks);
          })


        // Get Related Artists
        axios.get(
          "https://api.spotify.com/v1/artists/"
          + res.data.artists.items[0].id
          +"/related-artists?"
          +"&access_token="
          +token
        )
          .then(res3 => {
            setRelatedArtists(res3.data.artists);
          })
      })
      .catch(err => console.log(err));
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function image() {
    if (results[0].images[0]) {
      return results[0].images[0].url;
    } else {
      return "";
    }
  }

  return (
    <div>
      <Container>
        <h3 id="search-header" className="text-center">Artist {props.artistCount}</h3>
        <SearchForm
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          count={props.artistCount}
        />
        {/* Search Results */}
        <div className="d-flex justify-content-around">
          <ul className="search-results">
            {results.slice(0, 1).map(result => (
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
                    <ul className="related-artists mb-5">
                      <h5>Related Artists:</h5>
                      {relatedArtists.map(artist => (
                        <a key={artist.id} onClick={() => {
                          document.getElementById("search-" + props.artistCount).value = artist.name;
                          setSearch(artist.name);
                          setTimeout(() => {
                            document.getElementById("search-btn-" + props.artistCount).click();
                          }, 500);
                        }} className="artist">
                          <li className="list-group-item">
                          <img src={artist.images[2].url} className="artist-img" alt={artist.name}></img>
                            <p>{artist.name}</p>
                          </li>
                        </a>
                      ))}
                    </ul>
                  </div>
                  <div className="col">
                    <ul className="track-results mb-5">
                      <h5>Top Tracks:</h5>
                      {topTracks == null ? "" : topTracks.map(track => (
                        <iframe key={track.id} title={track.name} className="track" src={"https://open.spotify.com/embed/track/" + track.id} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default SpotifySearch;