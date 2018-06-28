const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/spotify-party').catch(err => console.log(err.message)); // connecting db

const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');
const trackRoutes = require('./routes/track');

// set up view engine as ejs
app.set('view engine', 'ejs');

app.use('/', authRoutes);
app.use('/', trackRoutes);
app.use('/playlists', playlistRoutes);

app.listen(3000, () => console.log('Listening on port 3000'));
