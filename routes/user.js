const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();

router.get('/playlists/:playlist_id/tracks/:page', controller.getUserTracks);

module.exports = router;