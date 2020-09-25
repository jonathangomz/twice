require('dotenv').config();

const express = require('express');
const qs = require('querystring');
const axios = require('axios').default;
const app = express();

// TODO: Save on localStorage or something
let token;

app.get('/', (req, res) => {
  res.json({
    message: 'Ready!'
  });
});

app.get('/login', function (req, res) {
  const client_id = process.env.CLIENT_ID;

  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + client_id +
    '&redirect_uri=' + process.env.CALLBACK);
});

app.get('/home', async (req, res) => {
  const code = req.query.code;
  let response, error;
  try {
    response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.CALLBACK,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  } catch (err) {
    error = err;
  }

  if (response.data) token = response.data;

  res.json(token || error);
});

app.get('/me', async (req, res) => {
  if (token) {
    let response, error;
    try {
      response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `${token.token_type} ${token.access_token}`
        }
      });
    } catch (err) {
      error = err;
    }

    res.json(response.data || error);
  } else res.redirect('/login');
});

module.exports = app;