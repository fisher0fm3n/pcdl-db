const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const lists = {
  new_releases: [
    "mtHq4hDv",
    "yM7uLK6T",
    "WN3pTqt3",
    "xTHtfK9z",
    "FGKdfiu",
    "eZYUkis",
  ],
  trending: ["AXUFHus", "GDUgdub", "eZYUkis", "iPIFnfs", "ZGDUgdub", "OifnEBy"],
  freebies: [
    "WN3pTqt3",
    "AXUFHus",
    "iPIFnfs",
    "OifnEBy",
    "fGDRuko",
    "ZGDUgdub",
  ],
  featured_playlist: [
    "vdONb7OZ",
    "v40kLvXY",
    "dB2w3OAj",
    "M5KSdXD9",
    "GBaeQBNb",
    "BGnUZnQj",
  ],
};

const playlists = [
  {
    id: "vdONb7OZ",
    role: "admin",
    author: "desmond",
    title: "Word Of The Month",
    thumbnail: "/images/playlists/0.png",
    description:
      "God is going to bless the works of your hands and you are going to be so productive — Pastor Chris Oyakhilome. Great rejoicing by the global congregation, followed the declaration of July to be ‘the Month of Productivity’ by Pastor Chris at the just concluded Global Communion Service.",
    list: [
      "mtHq4hDv",
      "yM7uLK6T",
      "WN3pTqt3",
      "xTHtfK9z",
      "FGKdfiu",
      "eZYUkis",
    ],
  },
  {
    id: "v40kLvXY",
    role: "admin",
    author: "desmond",
    title: "Spiritual Growth",
    thumbnail: "/images/playlists/1.png",
    description:
      "God is going to bless the works of your hands and you are going to be so productive — Pastor Chris Oyakhilome. Great rejoicing by the global congregation, followed the declaration of July to be ‘the Month of Productivity’ by Pastor Chris at the just concluded Global Communion Service.",
    list: [
      "mtHq4hDv",
      "yM7uLK6T",
      "WN3pTqt3",
      "xTHtfK9z",
      "FGKdfiu",
      "eZYUkis",
    ],
  },
  {
    id: "dB2w3OAj",
    role: "admin",
    author: "desmond",
    title: "Praise Night",
    thumbnail: "/images/playlists/2.png",
    description:
      "God is going to bless the works of your hands and you are going to be so productive — Pastor Chris Oyakhilome. Great rejoicing by the global congregation, followed the declaration of July to be ‘the Month of Productivity’ by Pastor Chris at the just concluded Global Communion Service.",
    list: [
      "mtHq4hDv",
      "yM7uLK6T",
      "WN3pTqt3",
      "xTHtfK9z",
      "FGKdfiu",
      "eZYUkis",
    ],
  },
  {
    id: "M5KSdXD9",
    role: "admin",
    author: "desmond",
    title: "Walking In The Spirit",
    thumbnail: "/images/playlists/3.png",
    description:
      "God is going to bless the works of your hands and you are going to be so productive — Pastor Chris Oyakhilome. Great rejoicing by the global congregation, followed the declaration of July to be ‘the Month of Productivity’ by Pastor Chris at the just concluded Global Communion Service.",
    list: [
      "mtHq4hDv",
      "yM7uLK6T",
      "WN3pTqt3",
      "xTHtfK9z",
      "FGKdfiu",
      "eZYUkis",
    ],
  },
  {
    id: "GBaeQBNb",
    role: "admin",
    author: "desmond",
    title: "Righteousness",
    thumbnail: "/images/playlists/4.png",
    description:
      "God is going to bless the works of your hands and you are going to be so productive — Pastor Chris Oyakhilome. Great rejoicing by the global congregation, followed the declaration of July to be ‘the Month of Productivity’ by Pastor Chris at the just concluded Global Communion Service.",
    list: [
      "mtHq4hDv",
      "yM7uLK6T",
      "WN3pTqt3",
      "xTHtfK9z",
      "FGKdfiu",
      "eZYUkis",
    ],
  },
  {
    id: "BGnUZnQj",
    role: "admin",
    author: "desmond",
    title: "Excellence",
    thumbnail: "/images/playlists/5.png",
    description:
      "God is going to bless the works of your hands and you are going to be so productive — Pastor Chris Oyakhilome. Great rejoicing by the global congregation, followed the declaration of July to be ‘the Month of Productivity’ by Pastor Chris at the just concluded Global Communion Service.",
    list: [
      "mtHq4hDv",
      "yM7uLK6T",
      "WN3pTqt3",
      "xTHtfK9z",
      "FGKdfiu",
      "eZYUkis",
    ],
  },
];

const media = [
  {
    id: "mtHq4hDv",
    type: ["watch", "listen"],
    poster: "/images/messages/benedictions.jpg",
    thumbnail: "/images/thumbnails/benedictions.png",
    duration: "5 mins 22 secs",
    title: "Benedictions",
    captions: ["English", "French"],
    tags: [
      "holy_spirit",
      "christian_living",
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
      "music",
      "classics",
      "questions_and_answers",
      "freebies",
      "audiobooks",
      "your_loveworld_specials",
      "chronicles_of_prophecy",
    ],
    description:
      "A benediction is an invocation of blessings, usually in words of prayer. In this insightful teaching by Pastor Chris, learn more on the meaning of a benediction, who can bestow a benediction, and the power of a benediction.",
  },
  {
    id: "yM7uLK6T",
    poster: "/images/messages/glory.jpg",
    thumbnail: "/images/messages/glory.jpg",
    duration: "4 mins",
    captions: ["English", "French"],
    title: "Our Calling To Glory",
    tags: ["holy_spirit", "christian_living", "faith"],
    description:
      "'Glory' is such a big word that not many understand what it really means. When we talk about glory, there are many who only consider a light, a cloud, or great beauty and splendor, but the glory of the spirit is beyond all that. As a child of God, you've been called into God’s Kingdom and His glory. When you answered the calling into the Kingdom, you answered the call into God's glory. Discover in this insightful message by Pastor Chris Oyakhilome, how to fully function and relate from this heavenly realm of glory--where only the Word of God is real and everything else is a shadow.",
  },
  {
    id: "WN3pTqt3",
    poster: "/images/messages/dew_of_heaven.jpg",
    thumbnail: "/images/messages/dew_of_heaven.jpg",
    duration: "2 mins",
    captions: ["English", "French"],
    title: "The Dew Of Heaven",
    tags: [
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
      "music",
      "audiobooks",
    ],
  },
  {
    id: "xTHtfK9z",
    poster: "/images/messages/the_power_pursuit_purpose.jpg",
    thumbnail: "/images/messages/the_power_pursuit_purpose.jpg",
    duration: "2 mins",
    captions: ["English", "French"],
    title: "The Power & Pursuit Of Purpose",
    tags: [
      "holy_spirit",
      "christian_living",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "classics",
      "questions_and_answers",
      "freebies",
    ],
  },
  {
    id: "THGtusFW",
    type: ["watch"],
    poster: "/images/messages/light.jpg",
    thumbnail: "/images/messages/light.jpg",
    duration: "2 mins",
    title: "The Light Of Life",
    captions: ["English", "French"],
    description:
      "The Word of God is light, and that light lightens every darkness. There’re mysteries and secrets about life, and the anointing of God’s Spirit has come upon us to guide us into the mysteries and secrets of God through the Word. Find out from this special teaching by Pastor Chris the purpose of the Word of God in your life.",
    tags: ["holy_spirit", "christian_living", "faith"],
  },
  {
    id: "AXUFHus",
    type: ["watch"],
    poster: "/images/messages/preparation.jpg",
    thumbnail: "/images/messages/preparation.jpg",
    duration: "2 mins",
    title: "An Exposé on the Year of Preparation",
    captions: ["English", "French"],
    description:
      "Gain deeper understanding from this exposé on the Year of Preparation as ministers expound with truths from God’s Word the impact of the message in their lives. The Man of God, Pastor Chris, gives light through the wisdom of God to nations, bringing to them God’s counsel to save them from the damnation coming to this world. He explains the rapture of the Church and the tribulation that will come to this world after the saints of God are gone to be with the Lord.",
    tags: [
      "holy_spirit",
      "christian_living",
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
    ],
  },
  {
    id: "ZGDUgdub",
    type: ["watch"],
    poster: "/images/messages/cpin.jpg",
    thumbnail: "/images/messages/cpin.jpg",
    duration: "2 mins",
    title: "Christ’s Purpose in You",
    captions: ["English", "French"],
    description:
      "Get to understand what God’s judgment is and how Christians are going to be judged with rewards and praise by God. Understand that God takes pleasure in you, and that salvation and righteousness belong to everyone who receives the gospel.",
    tags: [
      "holy_spirit",
      "christian_living",
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
    ],
  },
  {
    id: "FGKdfiu",
    type: ["watch"],
    poster: "/images/messages/3_cardinal_gifts.jpg",
    thumbnail: "/images/messages/3_cardinal_gifts.jpg",
    duration: "2 mins",
    title: "The 3 Cardinal Gifts of God: The Gift of the Holy Spirit",
    captions: ["English", "French"],
    description:
      "The Holy Spirit is an extraordinary gift to us as God’s children. Without Him, we cannot get heavenly materiality downloaded into our human spirit. He is the one who gives us the understanding of God’s Word. Learn from this special teaching by Pastor Chris, how to activate the gift of the Holy Spirit in your life.",
    tags: [
      "holy_spirit",
      "christian_living",
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
    ],
  },
  {
    id: "eZYUkis",
    type: ["watch"],
    poster: "/images/messages/understanding_the_gospel.jpg",
    thumbnail: "/images/messages/understanding_the_gospel.jpg",
    duration: "2 mins",
    title: "An Understanding of the Gospel of Jesus Christ",
    captions: ["English", "French"],
    description:
      "The accurate knowledge of God’s Word is what makes us masters in life. We have the life and nature of God in us, and the Holy Spirit gives us direction in all affairs of life through the Word. Learn from this teaching by Pastor Chris the place of the Holy Spirit in your understanding of the gospel of Jesus Christ.",
    tags: [
      "holy_spirit",
      "christian_living",
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
    ],
  },
  {
    id: "iPIFnfs",
    type: ["watch"],
    poster: "/images/messages/fullness_of_god.jpg",
    thumbnail: "/images/messages/fullness_of_god.jpg",
    duration: "2 mins",
    title: "The Fullness Of God",
    captions: ["English", "French"],
    description:
      "God wants to manifest His manifold wisdom through your peculiar character. Discover how His life can be expressed through you to your world.",
    tags: [
      "holy_spirit",
      "christian_living",
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
    ],
  },
  {
    id: "OifnEBy",
    type: ["watch"],
    poster: "/images/messages/the_lost_presence.jpg",
    thumbnail: "/images/messages/the_lost_presence.jpg",
    duration: "2 mins",
    title: "The Lost Presence",
    captions: ["English", "French"],
    description:
      "Adam lost his place of fellowship and was separated from his ultimate source. From then on, men over the ages have sought earnestly for the way back to God’s presence. This enthusing message by Pastor Chris unveils the way to the father’s presence, the authority and power we have in the name of Jesus and our glorious inheritance in Christ.",
    tags: [
      "holy_spirit",
      "christian_living",
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
    ],
  },
  {
    id: "yUSJics",
    type: ["watch"],
    poster: "/images/messages/our_origin_purpose_future.jpg",
    thumbnail: "/images/messages/our_origin_purpose_future.jpg",
    duration: "2 mins",
    title: "Our origin purpose and future",
    captions: ["English", "French"],
    description:
      "There are so many people in the world today living like vagabonds, going through life without an anchor, a purpose for living or a sense of direction but when you come into Christ, you become a child of God and a member of His body. To function excellently and enjoy all the benefits of this divine kingdom, you must know your Origin, understand your Purpose and live in preparation of your glorious future in Christ.",
    tags: [
      "holy_spirit",
      "christian_living",
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
      "evangelism",
      "soul_winning",
    ],
  },
  {
    id: "fGDRuko",
    type: ["watch"],
    poster: "/images/messages/giving_thanks.jpg",
    thumbnail: "/images/messages/giving_thanks.jpg",
    duration: "2 mins",
    title: "Giving Thanks",
    captions: ["English", "French"],
    description:
      "In this instructive message, you would discover the importance and rewards of giving thanks, as Pastor Chris teaches extensively from the scriptures with practical examples.",
    tags: [
      "faith",
      "health_and_healing",
      "prayer",
      "prosperity_and_finance",
      "church_growth",
    ],
  },
];

const app = express();

app.use(cors());

app.get("/media", (req, res) => res.json(media));

app.get("/lists", (req, res) => res.json(lists));

app.get("/playlists", (req, res) => res.json(playlists));

app.get("/playlists/:id/data", (req, res) => {
  const id = req.params.id;
  res.json(playlists.find((x) => x.id === id));
});

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
