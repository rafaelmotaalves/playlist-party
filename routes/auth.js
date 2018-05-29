const express = require('express');
const controller = require('../controllers/auth');

const router = express.Router();

router.get('/login', controller.login);

router.get('/callback', controller.callback);

router.get('/logout', controller.logout);

module.exports = router;
