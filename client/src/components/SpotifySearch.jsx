import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from "./Container";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

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

    //!SpotifySearch API
    
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

  return (
    <div>
      <Container>
        <h3 id="search-header" className="text-center">Artist {props.artistCount}</h3>
        <SearchForm
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />
        <SearchResults results={results} topTracks={topTracks} relatedArtists={relatedArtists}/>
      </Container>
    </div>
  );
};

export default SpotifySearch;