const spotify = require('../service/spotify');
const Router = require('express');
const router = Router();

router.get('/me', async (req, res) => {
  const r = await spotify.user.me(req.headers.authorization);
  res.json(r);
});

module.exports = router;