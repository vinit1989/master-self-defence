const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();
// const path = require('path')
// app.use('/static', express.static(path.join(__dirname, 'public')))
var youtubeVideos = [
  { videoId: 'M4_8PoRQP8w' },
  { videoId: 'Nl_eze5rAUc' },
  { videoId: 'bE0_QZgIXPw' },
  { videoId: 'mhnH92NhBXk' },
  { videoId: '8lVxtbBKbps' },
  { videoId: 'SfAoGd8R-CM' },
  { videoId: 'd87VgAhWnMk' },
  { videoId: 'KsnDrNqFX3w' },
  { videoId: 'k9Jn0eP-ZVg' },
  { videoId: '-V4vEyhWDZ0' },
  { videoId: 'VI0zJhcppzc' },
  { videoId: 'sY-P5GBwggU' },
  { videoId: 'CLcN_esKh20' },
  { videoId: 'fji463dsZXo' },
  { videoId: '7XI1uAdr_s4' },
  { videoId: 'bTX6-8C-4SU' },
  { videoId: 'ohWjtn3H_a4' },
  { videoId: 'CuifzOiOMEA' },
  { videoId: 'DuEVfMxs684' },
  { videoId: 'lCGUqpe9CNI' },
  { videoId: 'm-kJvLFkmP4' },
  { videoId: 'v0aWozYBOWg' },
  { videoId: 'ppeGR2w8SLM' },
  { videoId: '5Jx2XTgcIsc' },
  { videoId: 'jAh0cU1J5zk' },
  { videoId: 'pndPbpHLpos' },
  { videoId: 'Vl7ixKzCkUk' },
  { videoId: 'K5UO9zA3GK4' },
  { videoId: 'Gyr9gOtRdJ8' },
  { videoId: 'PushvkNzCBM' },
  { videoId: 'e7NpXQkw5pU' },
  { videoId: 'RcqS48phyAM' },
  { videoId: 'RP42NAK07OA' },
  { videoId: '-FUMcJltEXQ' },
  { videoId: 'CLcN_esKh20' },
  { videoId: 'q2K051yL1bY' },
  { videoId: 'S32KxQK0Ydg' },
  { videoId: 'n5eMDQsZf8g' },
  { videoId: 'loGSO00pK7U' },
  { videoId: '3-4gJrGd_JA' },
  { videoId: 'Vl7ixKzCkUk' },
  { videoId: 'td04uq9iTWI' },
  { videoId: 'OKtdYzlZ23k' },
  { videoId: 'AwF9PYeSou8' },
  { videoId: '6nGjCmZcX58' },
  { videoId: 'TsWRa_cgBsA' },
  { videoId: 'bLB85VwjkY0' },
  { videoId: 'W5O6jFGZS7k' },
  { videoId: 'ZNCDqzTtgdI' }
];
var videoId = youtubeVideos[0];
var videoNo = 0;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/setVideoId', (req, res) => {
  console.log(req.query.videoId);
  videoNo = parseInt(req.query.videoId);
  videoId = youtubeVideos[videoNo];
  res.json(videoId);
});

app.get('/getVideoId', (req, res) => {
  console.log(req.query.videoId);
  res.json(youtubeVideos[parseInt(req.query.videoId)]);
});

app.get('/videoNo', (req, res) => {
  res.json({videoNo: videoNo});
});

app.get('/', (req, res) => {
  res.json(videoId);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
