const express = require('express');
const controller = require('../controllers/playlist');

const router = express.Router();

router.post('/', controller.createPlaylist);

router.get('/:playlist_id/add/:track_id', controller.addTrackToPlaylist);

router.get('/:playlist_id', controller.showPlaylist);

router.delete('/:playlist_id', controller.deletePlaylist);

router.get('/', controller.getPlaylists);

module.exports = router;
