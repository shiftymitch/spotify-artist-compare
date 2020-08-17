const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const request = require('request');

//! api routes

// get Spotify access token
app.get('/api/token', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
      Authorization:
      'Basic ' +
      new Buffer(client_id + ':' + client_secret).toString('base64')
  },
  form: {
      grant_type: 'client_credentials'
  },
  json: true
  };
  request.post(authOptions, function(error, response, body) {
      res.json({ token: body.access_token});
  });
});

// serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "./index.html"))
  );
}

app.listen(PORT, () => console.log('App running on PORT: ' + PORT));
