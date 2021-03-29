const axios = require('axios').default;
const qs = require('querystring');

const spotify = {};

spotify.grantURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.CALLBACK}`;

spotify.getToken = async (code) => {
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
    error = err
  }

  return response?.data || error
}

spotify.me = async (token) => {
  let response, error;
  try {
    response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': token
      }
    });
  } catch (err) {
    error = err
  }

  return response?.data || error
}

spotify.fetchPlaylists = async (user_id, token) => {
  let response, error;
  try {
    response = await axios.get(`https://api.spotify.com/v1/users/${user_id}/playlists`, { headers: { Authorization: token } });
  } catch (err) {
    error = err
  }

  return response?.data || error
}

spotify.fetchPlaylistTracks = async (playlist, token) => {
  let response, error;
  try {
    response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, { headers: { Authorization: token } });
  } catch (err) {
    error = err
  }

  return response?.data || error
}

module.exports = spotify;