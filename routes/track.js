const express = require('express');
const controller = require('../controllers/track');

const router = express.Router();

router.get('/tracks/search', controller.searchTracks);

module.exports = router;
