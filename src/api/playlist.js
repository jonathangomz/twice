const Router = require('express').Router;
const spotify = require('../service/spotify');

const router = Router();

router.get('', async (req, res) => {
  const r = await spotify.playlist.fetch(req.query.user_id, req.headers.authorization);
  res.json(r);
});

router.get('/tracks', async (req, res) => {
  const r = await spotify.playlist.tracks(req.query.playlist, req.headers.authorization);
  res.json(r);
});

module.exports = router;