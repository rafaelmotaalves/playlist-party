const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

module.exports = {
  searchTracks: (req, res) => {
    const auth = req.headers.authorization;
    axios.get(`https://api.spotify.com/v1/search?q=${req.query.q}&type=track&limit=10 `, {
      headers: {
        Authorization: auth,
      },
    })
      .then(foundTracks => res.json(foundTracks.data.tracks.items.map(track => ({
        name: track.name,
        uri: track.uri,
        album: track.album.name,
        artists: track.artists.map(artist => artist.name),
      }))))
      .catch(err => console.log(err.response.data));
  },

};
