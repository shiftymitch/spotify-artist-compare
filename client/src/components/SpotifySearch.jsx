import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from "./Container";
import SearchForm from "./SearchForm";
import moment from "moment";

const SpotifySearch = props => {
  const [token, setToken] = useState([]);
  const [search, setSearch] = useState();
  const [results, setResults] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [remixes, setRemixes] = useState([]);
  const [latestRelease, setLatestRelease] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);

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

          // Get Latest Release
          axios.get(
            "https://api.spotify.com/v1/search?q="
            +"artist:" + search
            +"&type=track"
            +"&access_token="
            +token
          )
            .then(res2 => {
              console.log(res2.data.tracks.items)
              setLatestRelease(res2.data.tracks.items[0])
              setCurrentTrack(res2.data.tracks.items[0].id)
            })
        
        // Get Top Tracks
        axios.get(
          "https://api.spotify.com/v1/artists/"
          + res.data.artists.items[0].id
          +"/top-tracks?"
          +"country=US"
          +"&access_token="
          +token
        )
          .then(res3 => {
            setTopTracks(res3.data.tracks);
          })


        // Get Related Artists
        axios.get(
          "https://api.spotify.com/v1/artists/"
          + res.data.artists.items[0].id
          +"/related-artists?"
          +"&access_token="
          +token
        )
          .then(res4 => {
            setRelatedArtists(res4.data.artists);
          })

        // Get Remixes
        axios.get(
          "https://api.spotify.com/v1/search?q="
          + search + "%20remix"
          +"&type=track"
          +"&access_token="
          +token
        )
          .then(res5 => {
            setRemixes(res5.data.tracks.items);
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
      {/* Music Player */}
      <div className="current-track fixed-bottom">
        <iframe id="current-track" title="current-track" src={"https://open.spotify.com/embed/track/" + currentTrack} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
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
                    <img className="img-fluid" src={image()} alt={result.name}></img>
                  </div>
                  <div className="col">
                    <h5><a target="_blank" rel="noopener noreferrer" href={result.external_urls.spotify}>{result.name}</a></h5>
                    <p><strong>Followers: </strong>{numberWithCommas(result.followers.total)}</p>
                    <p><strong>Popularity: </strong>{result.popularity}</p>
                    <p><strong>Genres: </strong>{result.genres.join(", ")}</p>
                    <p><strong>Latest Release:</strong></p>
                    <a key={latestRelease.id} className="track" onClick={() => {
                      setCurrentTrack(latestRelease.id);
                    }} >
                      <li className="list-group-item">
                        <img src={latestRelease.album == null ? "" : latestRelease.album.images[2].url} className="latest-img" alt={latestRelease.name}></img>
                        <p>{latestRelease.name}</p>
                        <p>{latestRelease.album == null ? "N/A" : moment(latestRelease.album.release_date).format("MMM Do, YYYY")}</p>
                      </li>
                    </a>
                  </div> 
                  <a href={result.external_urls.spotify} target="_blank" rel="noopener noreferrer"><img src="/spotify_icon.png" title="View on Spotify.com" alt="spotify-icon" id="spotify-icon"></img></a>
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
                            <p className="artist-name">{artist.name}</p>
                          </li>
                        </a>
                      ))}
                    </ul>
                  </div>
                  <div className="col">
                    <ul className="track-results mb-5">
                      <h5>Top Tracks:</h5>
                      {topTracks == null ? "" : topTracks.map(track => (
                        <a key={track.id} className="track" onClick={() => {
                          setCurrentTrack(track.id);
                        }} >
                          <li className="list-group-item">
                            <img src={track.album.images[2].url} className="track-img" alt={track.name}></img>
                            <p>{track.name}</p>
                          </li>
                        </a>
                      ))}
                    </ul>
                    <ul className="remixes mb-5">
                      <h5>Remixes:</h5>
                      {remixes == null ? "" : remixes.map(track => (
                        <a key={track.id} className="track" onClick={() => {
                          setCurrentTrack(track.id);
                        }}>
                          <li className="list-group-item">
                            <img src={track.album.images[2].url} className="track-img" alt={track.name}></img>
                            <p>{track.name}</p>
                          </li>
                        </a>
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