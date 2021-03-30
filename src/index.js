if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const playlists = require('./api/playlist');
const user = require('./api/user');
const auth = require('./api/auth');
const clone = require('./api/clone');
const app = express();


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Ready!'
  });
});


app.use('/auth', auth);
app.use('/user', user);
app.use('/playlists', playlists);
app.use('/clone', clone);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});