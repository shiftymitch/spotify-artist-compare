import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from "./Container";
import SearchForm from "./SearchForm";
import moment from "moment";

document.querySelector(".current-track")

const Main = props => {
  const [token, setToken] = useState([]);
  const [songkickToken, setSongkickToken] = useState([]);
  const [fbToken, setFBToken] = useState([]);
  const [search, setSearch] = useState();
  const [results, setResults] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [remixes, setRemixes] = useState([]);
  const [latestRelease, setLatestRelease] = useState([]);
  const [playerType, setPlayerType] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [events, setEvents] = useState([]);
  const [FBAudience, setFBAudience] = useState([]);
  const [googleTrend, setGoogleTrend] = useState([]);

  useEffect(() => {
    // Get Spotify Token
    axios.get('/api/token')
      .then(res => {
        setToken(res.data.token);
        // Get Songkick Token
        axios.get("/api/songkick")
          .then(res2 => {
            setSongkickToken(res2.data.token);
          })
        // Get FB Token
        axios.get("/api/fb")
          .then(res3 => {
            setFBToken(res3.data.token);
          })
      })
      .catch(e => console.log(e));
  }, []);

  function handleInputChange(event) {
    setSearch(event.target.value);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get Spotify Artist
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

        // Get FB Ads Audience Size
        axios.get(
          "https://graph.facebook.com/search?type=adinterest&q=["
          + search
          +"]&limit=5&locale=en_US&access_token="
          + fbToken
        )
          .then(res7 => {
            setFBAudience(res7.data.data.filter(result => result.name.length === search.length));
          })

        axios.get("/api/google/" + search)
          .then(res8 => {
            setGoogleTrend(res8.data.default.timelineData.reverse());
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

  function googleTrendAverage() {
    return [
      googleTrend[0].formattedValue[0], 
      googleTrend[1].formattedValue[0], 
      googleTrend[2].formattedValue[0], 
      googleTrend[3].formattedValue[0],
      googleTrend[4].formattedValue[0],
      googleTrend[5].formattedValue[0],
      googleTrend[6].formattedValue[0],
      googleTrend[7].formattedValue[0]
    ];
  }

  function getArtists(track) {
    let artists = track.artists.map(artist => artist.name);
    return artists.join(", ");
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
                    <h2><a href={result.external_urls.spotify} target="_blank" rel="noopener noreferrer" >{result.name}</a></h2>
                    <p><strong>Followers: </strong>{numberWithCommas(result.followers.total)}</p>
                    <p><strong>Genres: </strong>{result.genres.join(", ")}</p>
                    <div className="social-links">
                      <a href={"https://www.facebook.com/search/top/?q=" + search + "&opensearch=1"} target="_blank" rel="noopener noreferrer" > <i className="fa fa-facebook" ></i></a>
                      <a href={"https://twitter.com/search?q=" + search} target="_blank" rel="noopener noreferrer" > <i className="fa fa-twitter" ></i></a>
                      <a href={"https://google.com/search?q=" + search + "instagram"} target="_blank" rel="noopener noreferrer" > <i className="fa fa-instagram" ></i></a>
                      <a href={"https://soundcloud.com/search?q=" + search} target="_blank" rel="noopener noreferrer" > <i className="fa fa-soundcloud" ></i></a>
                    </div>
                  </div> 
                <a href={result.external_urls.spotify} target="_blank" rel="noopener noreferrer"><img src="/spotify_icon.svg" title="View on Spotify.com" alt="spotify-icon" id="spotify-icon"></img></a>
                </div>
                <div className="row">
                  <div className="col data">
                    <p><strong>Popularity:</strong> <i title="Spotify Rank" className="fa fa-question-circle-o"></i></p>
                    <p>{result.popularity}</p>
                  </div>
                  <div className="col data">
                    <p><strong>FB Ads Audience:</strong> <i title="Global reachable interest audience with Facebook Ads" className="fa fa-question-circle-o"></i></p>
                    <p>{FBAudience[0] == null ? "N/A" : FBAudience[0].audience_size.toLocaleString()}</p>
                  </div>
                  <div className="col data">
                    <p><strong>Search Trend: </strong><i title="Google search trend: Scale: 1-100 compared to most searched time." className="fa fa-question-circle-o"></i></p>
                    <div className="trend-container">
                      <p>
                        <div id="trend" className="trend">{googleTrend[0] == null ? "N/A" : googleTrendAverage().join(", ")}</div>
                      </p>
                      <p className="trend-helper">
                        <span>Last Week</span>
                        <span>8 Weeks Ago</span>
                      </p>
                    </div>
                  </div>
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
                        <p className="sub-text">{latestRelease.release_date == null ? "N/A" : moment(latestRelease.release_date).format("MMM Do, YYYY")}</p>
                      </div>
                    </a>
                  </div>
                  <div className="col">
                    <p><strong>Last Event:</strong></p>
                    <a href={!events[0] ? "N/A" : events[0].uri} target="_blank" rel="noopener noreferrer">
                      <div className="latest-release">
                        <img src="https://assets.sk-static.com/assets/images/nw/static-pages/styleguide/sk-black-badge.320daf9f279a7a0046acd0e8daed4987.jpg" id="icon" alt="songkick icon"></img>
                        <p>{!events[0] ? "N/A" : events[0].location.city}</p>
                        <p className="sub-text">{!events[0] ? "N/A" : moment(events[0].start.date).format("MMM Do, YYYY")}</p>
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
                            <div>
                            <p className="artist-name">{artist.name}</p>
                            <p className="sub-text">Followers: {artist.followers.total.toLocaleString()}</p>
                            </div>
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
                            <p className="sub-text">{getArtists(track)}</p>
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
                            <img src={track.album.images[2] == null ? "N/A" : track.album.images[2].url} className="track-img" alt={track.name}></img>
                            <p>{track.name}</p>
                            <p className="sub-text">{getArtists(track)}</p>
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
                            <p className="sub-text">{moment(event.start.date).format("MMM Do, YYYY")}</p>
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

export default Main;