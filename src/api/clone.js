const spotify = require('../service/spotify');
const Router = require('express');
const router = Router();

router.post('/:playlist', async (req, res) => {
  const tracks = await spotify.playlist.tracks.fetch(req.params.playlist, req.headers.authorization);

  const fetch_status = tracks?.response?.status;
  if (fetch_status && fetch_status !== 200) {
    res.status = tracks.response.status;
    res.json({
      tracks
    });
  } else {
    const tracks_to_be_added = [];

    console.log(tracks.items);

    for (const track of tracks.items) {
      tracks_to_be_added.push(track.track.uri);
    }

    const new_playlist = await spotify.playlist.create(req.body.name, req.body.user_id, req.headers.authorization);

    const creation_status = new_playlist?.response?.status;
    if (creation_status && creation_status !== 200) {
      res.status = new_playlist.response.status;
      res.json({
        new_playlist
      });
    } else {
      const id = new_playlist.id;

      const add_track = await spotify.playlist.tracks.add(new_playlist.id, tracks_to_be_added, req.headers.authorization);

      const add_track_status = tracks?.response?.status;
      if (add_track_status && add_track_status !== 200) {
        res.status = add_track.response.status;
        res.json({
          add_track
        });
      } else {
        res.json({
          id
        });
      }

    }
  }
});

module.exports = router;