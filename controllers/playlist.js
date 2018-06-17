const Playlist = require('../models/playlist');
const axios = require('axios');


module.exports = {
  getPlaylists: (req, res) => {
    Playlist.find({ owner: req.auth.id })
      .then(foundPlaylists => res.send(foundPlaylists));
  },

  addTrackToPlaylist: (req, res) => {
    const params = {
      uris: [],
    };
    params.uris.push(req.params.track_id);
    Playlist.findById(req.params.playlist_id)
      .then(foundPlaylist => axios.post(`https://api.spotify.com/v1/users/${req.auth.id}/playlists/${foundPlaylist.spotifyId}/tracks`, params, {
        headers: {
          Authorization: `Bearer ${req.auth.accessToken}`,
          'content-type': 'application/json',
        },
      }))
      .then(() => res.redirect('back'))
      .catch(err => console.log(err));
  },

  createPlaylist: (req, res) => {
    const reqData = JSON.parse(req.body.data);
    const data = {
      name: reqData.name,
      public: false,
      collaborative: true,
      description: reqData.description,
    };
    const auth = req.headers.authorization;
    const userId = req.query.id;
    axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, data, {
      headers: {
        Authorization: auth,
        'content-type': 'application/json',
      },
    })
      .then(((response) => {
        const newPlaylist = {
          name: data.name,
          description: data.description,
          img: null,
          spotifyId: response.data.id,
          owner: userId,
        };
        return Playlist.create(newPlaylist);
      }))
      .then(createdPlaylist => res.send(createdPlaylist))
      .catch(err => res.send(err.response.data.error));
  },

  deletePlaylist: (req, res) => {
    Playlist.findByIdAndRemove(req.params.playlist_id)
      .then(removedPlaylist => res.send(removedPlaylist))
      .catch(err => console.log(err));
  },

  showPlaylist: (req, res) => {
    Playlist.findById(req.params.playlist_id)
      .then(foundPlaylist => axios.get(`https://api.spotify.com/v1/users/${req.auth.id}/playlists/${foundPlaylist.spotifyId}`, {
        headers: {
          Authorization: `Bearer ${req.auth.accessToken}`,
          'content-type': 'application/json',
        },
      }))
      .then((response) => {
        const refactoredTracks = response.data.tracks.items.map(tracks => ({
          name: tracks.track.name,
          uri: tracks.track.uri,
          album: tracks.track.album.name,
          artists: tracks.track.artists[0].name,
        }));
        res.json({
          name: response.data.name,
          image: response.data.images[1] ? response.data.images[1].url : null,
          owner: {
            name: response.data.owner.display_name,
            id: response.data.owner.id,
          },
          tracks: refactoredTracks,
        });
      })
      .catch(err => console.log(err));
  },

};
