const axios = require('axios').default;
const qs = require('querystring');

const spotify = {
  auth: {},
  user: {},
  playlist: {
    tracks: {},
  },
};

spotify.auth.grantURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.CALLBACK}&scope=playlist-modify-public%20playlist-modify-private`;

spotify.auth.token = async (code) => {
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

spotify.user.me = async (token) => {
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

spotify.playlist.fetch = async (user_id, token) => {
  let response, error;
  try {
    response = await axios.get(`https://api.spotify.com/v1/users/${user_id}/playlists`, { headers: { Authorization: token } });
  } catch (err) {
    error = err
  }

  return response?.data || error
}

spotify.playlist.fetchOne = async (playlists, token) => {
  let response, error;
  try {
    response = await axios.get(`https://api.spotify.com/v1/playlists/${playlists}`, { headers: { Authorization: token } });
  } catch (err) {
    error = err
  }

  return response?.data || error
}

spotify.playlist.create = async (name, user_id, token) => {
  let response, error;
  try {
    response = await axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, { name }, { headers: { Authorization: token } });
  } catch (err) {
    error = err
  }

  return response?.data || error
}

spotify.playlist.tracks.fetch = async (playlist, token) => {
  let response, error;
  try {
    response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, { headers: { Authorization: token } });
  } catch (err) {
    error = err
  }

  return response?.data || error
}

spotify.playlist.tracks.add = async (playlist, tracks, token) => {
  let response, error;
  try {
    response = await axios.post(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, tracks, { headers: { Authorization: token } });
  } catch (err) {
    error = err
  }

  return response?.data || error
}

module.exports = spotify;