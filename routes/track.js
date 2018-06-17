const express = require('express');
const controller = require('../controllers/track');

const router = express.Router();

router.get('/playlists/:playlist_id/tracks/:page', controller.getUserTracks);

router.get('/tracks/search', controller.searchTracks);

module.exports = router;
