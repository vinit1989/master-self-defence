const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();

const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
  
mongoose.connect("mongodb+srv://vinitraj:Vn152010.@cluster0.b6hv1.mongodb.net/master-self-defence?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const videoNoSchema = {
  videoNo: Number
};

const VideoNo = mongoose.model("VideoNo", videoNoSchema);

app.set("view engine", "ejs");
  
app.use(bodyParser.urlencoded({
    extended: true
}));
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

var faqsList = [
  {question: "1", answer: "One"},
  {question: "2", answer: "Two"},
  {question: "3", answer: "Three"},
  {question: "4", answer: "Four"},
  {question: "5", answer: "Five"},
  {question: "6", answer: "Six"},
  {question: "7", answer: "Seven"},
  {question: "8", answer: "Eight"},
  {question: "9", answer: "Nine"},
  {question: "10", answer: "Ten"},
  {question: "11", answer: "Eleven"}
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
  // videoId = youtubeVideos[videoNo];
  const videoIds = new VideoNo({
    videoNo: videoNo
  });
  VideoNo.find({}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
      if (docs.length !== 0) {
        VideoNo.updateOne({}, 
          { videoNo: videoNo }, function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
              console.log("Updated Docs : ", docs);
              videoId = youtubeVideos[videoNo];
              res.json(videoId);
          }
        });
      } else {
        videoIds.save(function (err) {
            if (err) {
                throw err;
            } else {
              videoId = youtubeVideos[videoNo];
              res.json(videoId);
            }
        });
      }
    }
  });
});

app.get('/getVideoId', (req, res) => {
  let videoNoN = parseInt(req.query.videoId);
  let videoIdN = youtubeVideos[videoNoN];
  res.json({ videoId : videoIdN.videoId });
});

app.get('/videoNo', (req, res) => {
  VideoNo.find({}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
      res.json(docs[0]);
    }
  })
});

app.get('/', (req, res) => {
  VideoNo.find({}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
      videoId = youtubeVideos[docs[0].videoNo];
      res.json(videoId); 
    }
  });
});

app.get('/faq', (req, res) => {
  res.json({ faq: faqsList });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
