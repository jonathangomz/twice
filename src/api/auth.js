const spotify = require('../service/spotify');
const Router = require('express');
const router = Router();

router.get('/login', (req, res) => {
  res.redirect(spotify.grantURL);
});

router.get('/callback', (req, res) => {
  res.json(req.query);
});

router.get('/token', async (req, res) => {
  const r = await spotify.getToken(req.body.code);
  res.json(r);
});

module.exports = router;