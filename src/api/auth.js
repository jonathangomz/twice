const spotify = require('../service/spotify');
const Router = require('express');
const router = Router();

router.get('/login', (req, res) => {
  res.redirect(spotify.auth.grantURL);
});

router.get('/callback', (req, res) => {
  res.json(req.query);
});

router.post('/token', async (req, res) => {
  const r = await spotify.auth.token(req.body.code);
  res.json(r);
});

module.exports = router;