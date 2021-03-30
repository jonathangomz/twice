const express = require('express');
const Router = express.Router;
const spotify = require('../service/spotify');

const router = Router();

router.use(express.json());

router.get('', async (req, res) => {
  const r = await spotify.playlist.fetch(req.query.user_id, req.headers.authorization);
  res.json(r);
});

router.get('/:playlist', async (req, res) => {
  const r = await spotify.playlist.fetchOne(req.params.playlist, req.headers.authorization);
  res.json(r);
});

router.post('', async (req, res) => {
  const r = await spotify.playlist.create(req.body.name, req.query.user_id, req.headers.authorization);
  res.json(r);
});

router.get('/:playlist/tracks', async (req, res) => {
  const r = await spotify.playlist.tracks.fetch(req.params.playlist, req.headers.authorization);
  res.json(r);
});

router.post('/:playlist/tracks', async (req, res) => {
  const r = await spotify.playlist.tracks.add(req.params.playlist, req.body, req.headers.authorization);
  res.json(r);
});

module.exports = router;
