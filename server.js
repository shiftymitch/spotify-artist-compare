require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const request = require('request');
const googleTrends = require("google-trends-api");

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

app.get("/api/songkick", (req, res) => {
  res.json({ token: process.env.SONGKICK_API_KEY});
});

app.get("/api/fb", (req, res) => {
  res.json({ token: process.env.FB_API_KEY});
});

app.get("/api/google/:search", (req, res) => {
  // Get Google Trend
  let query = {
    keyword: req.params.search,
    startTime: new Date("2019-01-01")
  };
  googleTrends.interestOverTime(query)
    .then(result => {
      let parsedData = JSON.parse(result)
      res.json(parsedData);
    })
    .catch(err => {
      console.error('Oh no there was an error', err);
    });
})

// serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')))

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
}

app.listen(PORT, () => console.log('App running on PORT: ' + PORT));
