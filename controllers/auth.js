const axios = require('axios');
const querystring = require('querystring');
const generateRandomString = require('../helpers/generateRandomString');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const url = process.env.ADDRESS;


module.exports = {
  login: (req, res) => {
    const state = generateRandomString(16);
    res.json({
      url: `https://accounts.spotify.com/authorize?${querystring.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri: `${url}/callback`,
        scope: 'user-read-private user-read-email playlist-modify-private playlist-modify-public user-library-read',
        state,
      })}`,
      state,
    });
  },

  refresh: (req, res) => {
    const { refreshToken } = req.query;
    const data = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    axios.post('https://accounts.spotify.com/api/token', querystring.stringify(data), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    })
      .then(response => res.json({
        accessToken: response.data.access_token,
        expiresAt: Date.now() + response.data.expires_in,
      }))
      .catch(err => console.log(err));
  },

  callback: (req, res) => {
    const { code, state, storedState } = req.query;
    const authOptions = {
      code,
      redirect_uri: `${url}/callback`,
      grant_type: 'authorization_code',
    };
    const authorization = {};
    if (storedState && state === storedState) {
      axios.post('https://accounts.spotify.com/api/token', querystring.stringify(authOptions), {
        headers: {
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => {
          authorization.accessToken = response.data.access_token;
          authorization.refreshToken = response.data.refresh_token;
          authorization.expiresAt = Date.now() + (response.data.expires_in * 1000);
          return axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${authorization.accessToken}`,
            },
          });
        })
        .then((response) => {
          authorization.name = response.data.display_name;
          authorization.id = response.data.id;
          authorization.img = response.data.images[0].url;
          res.json(authorization);
        })
        .catch(err => res.json(err));
    } else {
      res.json('state-mismatch');
    }
  },

};
