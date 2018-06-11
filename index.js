const express = require('express');
const checkToken = require('./middleware/auth');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/spotify-party').catch(err => console.log(err.message)); // connecting db

const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');
const userRoutes = require('./routes/user');

// set up view engine as ejs
app.set('view engine', 'ejs');

const home = (req, res) => {
  res.render('index.ejs', { name: req.auth.name, img: req.auth.img });
};

app.use('/', authRoutes);
app.use('/', checkToken, userRoutes);
app.get('/', checkToken, home);
app.use('/playlists', checkToken, playlistRoutes);

app.listen(3000);
