const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const media = [
  {
    id: "mtHq4hDv",
    type: ["watch", "listen"],
    poster: "/images/messages/benedictions.jpg",
    thumbnail: "/images/thumbnails/benedictions.png",
    duration: "5 mins 22 secs",
    name: "Benedictions",
    captions: ["English", "French"],
    description:
      "A benediction is an invocation of blessings, usually in words of prayer. In this insightful teaching by Pastor Chris, learn more on the meaning of a benediction, who can bestow a benediction, and the power of a benediction.",
  },
  {
    id: "yM7uLK6T",
    poster: "/images/messages/glory.jpg",
    duration: "4 mins",
    name: "Our Calling To Glory",
  },
  {
    id: "WN3pTqt3",
    poster: "/images/messages/dew_of_heaven.jpg",
    duration: "2 mins",
    name: "The Dew Of Heaven",
  },
  {
    id: "xTHtfK9z",
    poster: "/images/messages/the_power_pursuit_purpose.jpg",
    duration: "2 mins",
    name: "The Power & Pursuit Of Purpose",
  },
  {
    id: "THGtusFW",
    type: ["watch"],
    poster: "/images/messages/light.jpg",
    thumbnail: "/images/messages/light.jpg",
    duration: "2 mins",
    name: "The Light Of Life",
    captions: ["English"],
    description:
      "The Word of God is light, and that light lightens every darkness. There’re mysteries and secrets about life, and the anointing of God’s Spirit has come upon us to guide us into the mysteries and secrets of God through the Word. Find out from this special teaching by Pastor Chris the purpose of the Word of God in your life.",
  },
];

const app = express();

app.use(cors());

app.get("/media", (req, res) => res.json(media));

app.get("/media/:id/data", (req, res) => {
  const id = req.params.id;
  res.json(media.find((x) => x.id === id));
});

app.get("/media/:id/video", (req, res) => {
  const path = `assets/${req.params.id}.mp4`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.get("/media/:id/audio", (req, res) => {
  const file = `assets/${req.params.id}.mp3`;
  const stat = fs.statSync(file);
  const total = stat.size;
  if (req.headers.range) {
  }
  fs.exists(file, (exists) => {
    if (exists) {
      const range = req.headers.range;
      const parts = range.replace(/bytes=/, "").split("-");
      const partialStart = parts[0];
      const partialEnd = parts[1];

      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
      const chunksize = end - start + 1;
      const rstream = fs.createReadStream(file, { start: start, end: end });

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/mpeg",
      });
      rstream.pipe(res);
    } else {
      res.send("Error - 404");
      res.end();
      // res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
      // fs.createReadStream(path).pipe(res);
    }
  });
});

app.listen(process.env.PORT || 5000);
