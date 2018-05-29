const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
  name: String,
  description: String,
  img: String,
  spotifyId: String,
  owner: String,
});

module.exports = mongoose.model('Playlist', playlistSchema);
