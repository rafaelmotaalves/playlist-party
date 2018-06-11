const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

module.exports = {
  getUserTracks: (req, res) => {
    axios(`https://api.spotify.com/v1/me/tracks?${querystring.stringify({
      limit: 30,
      offset: 30 * (req.params.page - 1),
    })}`, {
      headers: {
        Authorization: `Bearer ${req.auth.accessToken}`,
      },
    })
      .then((response) => {
        const refactoredTracks = response.data.items.map(track => (
          {
            name: track.track.name,
            uri: track.track.uri,
            album: {
              name: track.track.album.name,
              id: track.track.album.id,
            },
            artists: track.track.album.artists.map(artists => ({
              id: artists.id,
              name: artists.name,
            })),
          }
        ));
        res.json({
          tracks: refactoredTracks,
          page: req.params.page,
          playlist: req.params.playlist_id,
        });
      })
      .catch(err => console.log(err.response));
  },

};
