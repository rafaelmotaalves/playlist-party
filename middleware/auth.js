const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;


module.exports = (req, res, next) => {
  const auth = req.cookies.Auth;
  if (!auth) {
    res.send('no auth');
  } else if (auth.expiresAt <= Date.now()) {
    const authOptions = {
      grant_type: 'refresh_token',
      refresh_token: auth.refreshToken,
    };
    axios.post('https://accounts.spotify.com/api/token', querystring.stringify(authOptions), {
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        auth.accessToken = response.data.access_token;
        auth.expiresAt = Date.now() + (response.data.expires_in * 1000);
        req.auth = auth;
        res.cookie('Auth', auth);
        next();
      })
      .catch(err => console.log(err));
  } else {
    req.auth = auth;
    next();
  }
};
