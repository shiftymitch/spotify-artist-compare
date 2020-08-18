import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from "./Container";
import SearchForm from "./SearchForm";
import moment from "moment";

document.querySelector(".current-track")

const SpotifySearch = props => {
  const [token, setToken] = useState([]);
  const [songkickToken, setSongkickToken] = useState([]);
  const [search, setSearch] = useState();
  const [results, setResults] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [remixes, setRemixes] = useState([]);
  const [latestRelease, setLatestRelease] = useState([]);
  const [playerType, setPlayerType] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('/api/token')
      .then(res => {
        setToken(res.data.token);
        axios.get("/api/songkick")
          .then(res2 => {
            setSongkickToken(res2.data.token);
          })
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
        let artistId = res.data.artists.items.filter(filtered => filtered.name.length === search.length)[0].id;
        setResults(res.data.artists.items.filter(filtered => filtered.name.length === search.length));

          // Get Latest Release
          axios.get(
            "https://api.spotify.com/v1/artists/"
            + artistId
            +"/albums?q="
            +"&include_groups=single"
            +"&market=US"
            +"&access_token="
            +token
          )
            .then(res2 => {
              setLatestRelease(res2.data.items[0])
              setPlayerType("album")
              setCurrentTrack(res2.data.items[0].id)
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

        // Get Songkick Events
        axios.get(
          "https://api.songkick.com/api/3.0/search/artists.json?apikey="
          + songkickToken + "&query=" + search
        )
          .then(res6 => {
            axios.get(
              "https://api.songkick.com/api/3.0/artists/"
              + res6.data.resultsPage.results.artist[0].id
              + "/gigography.json?apikey=" + songkickToken
              + "&order=desc"
            )
              .then(res7 => {
                setEvents(res7.data.resultsPage.results.event)
              })
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
        {/* Music Player */}
        <div className="current-track sticky-top">
          <iframe id="current-track" title="current-track" src={"https://open.spotify.com/embed/" + playerType + "/" + currentTrack} width="100%" height="100%" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
        {/* Search Results */}
        <div className="d-flex justify-content-around">
          <ul className="search-results">
            {results.slice(0, 1).map(result => (
              <li key={result.id} className="list-group-item">
                <div className="row">
                  <div className="col-4 profile-img">
                    <img className="img-fluid" src={image()} alt={result.name}></img>
                  </div>
                  <div className="col">
                    <h5><a target="_blank" rel="noopener noreferrer" href={result.external_urls.spotify}>{result.name}</a></h5>
                    <p><strong>Followers: </strong>{numberWithCommas(result.followers.total)}</p>
                    <p><strong>Popularity: </strong>{result.popularity}</p>
                    <p><strong>Genres: </strong>{result.genres.join(", ")}</p>
                  </div> 
                  <a href={result.external_urls.spotify} target="_blank" rel="noopener noreferrer"><img src="/spotify_icon.svg" title="View on Spotify.com" alt="spotify-icon" id="spotify-icon"></img></a>
                </div>
                <br></br>
                <div className="row">
                  <div className="col">
                    <p><strong>Last Release:</strong></p>
                    <a key={latestRelease.id} className="track" onClick={() => {
                      setPlayerType("album")
                      setCurrentTrack(latestRelease.id);
                    }} >
                      <div className="latest-release">
                        <img src={latestRelease.images == null ? "" : latestRelease.images[2].url} className="latest-img" alt={latestRelease.name}></img>
                        <p>{latestRelease.name}</p>
                        <p>{latestRelease.release_date == null ? "N/A" : moment(latestRelease.release_date).format("MMM Do, YYYY")}</p>
                      </div>
                    </a>
                  </div>
                  <div className="col">
                    <p><strong>Last Event:</strong></p>
                    <a href={!events[0] ? "N/A" : events[0].uri} target="_blank" rel="noopener noreferrer">
                      <div className="latest-release">
                        <img src="https://assets.sk-static.com/assets/images/nw/static-pages/styleguide/sk-black-badge.320daf9f279a7a0046acd0e8daed4987.jpg" id="icon" alt="songkick icon"></img>
                        <p>{!events[0] ? "N/A" : events[0].location.city}</p>
                        <p>{!events[0] ? "N/A" : moment(events[0].start.date).format("MMM Do, YYYY")}</p>
                      </div>
                    </a>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col">
                    <ul className="related-artists mb-5">
                      <h3>Related Artists:</h3>
                      {relatedArtists.map(artist => (
                        <a key={artist.id} onClick={() => {
                          document.getElementById("search-" + props.artistCount).value = artist.name;
                          setSearch(artist.name);
                          setTimeout(() => {
                            document.getElementById("search-btn-" + props.artistCount).click();
                            window.scrollTo(0, 0);
                          }, 500);
                        }} className="artist">
                          <li className="list-group-item">
                            <img src={artist.images[2].url} className="artist-img" alt={artist.name}></img>
                            <p className="artist-name">{artist.name}</p>
                            <p className="followers">Followers: {artist.followers.total.toLocaleString()}</p>
                          </li>
                        </a>
                      ))}
                    </ul>
                    <ul className="track-results mb-5">
                      <h3>Top Tracks:</h3>
                      {topTracks == null ? "" : topTracks.map(track => (
                        <a key={track.id} className="track" onClick={() => {
                          setPlayerType("track");
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
                      <h3>Remixes:</h3>
                      {remixes == null ? "" : remixes.map(track => (
                        <a key={track.id} className="track" onClick={() => {
                          setPlayerType("track")
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
                  <div className="col">
                    <ul className="events mb-5">
                      <h3>Recent Events:</h3>
                      {events == null ? "" : events.map(event => (
                        <a key={event.id} href={event.uri} className="track" target="_blank" rel="noopener noreferrer">
                          <li className="list-group-item">
                            <img src="https://assets.sk-static.com/assets/images/nw/static-pages/styleguide/sk-black-badge.320daf9f279a7a0046acd0e8daed4987.jpg" id="icon" alt="songkick icon"></img>
                            <p>{event.location.city}</p>
                            <p>{moment(event.start.date).format("MMM Do, YYYY")}</p>
                          </li>
                        </a>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    
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