const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const animationRoutes = require("./routes/animation/index");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "frames");
  },
  filename: function (req, file, cb) {
    console.log(req.params.imageName);
    const ext = file.mimetype.split("/")[1];
    if (req.params.imageName) cb(null, `${req.params.imageName}.${ext}`);
    else cb(null, `${file.fieldname}${Date.now()}.${ext}`);
  },
});
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "animVideos");
  },
  filename: function (req, file, cb) {
    console.log(req.params.imageName);
    const ext = file.mimetype.split("/")[1];
    if (req.params.imageName) cb(null, `${req.params.imageName}.${ext}`);
    else cb(null, `${file.fieldname}${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });
const videoUpload = multer({ storage: videoStorage });

// app.use(cors());
app.use(bodyParser.json());
app.use("/animation", animationRoutes);
app.post("/frames/", upload.single("frame"), function (req, res, next) {
  console.log({ file: req.file });
  res.send(req.file);
});
app.post(
  "/animationVideos/",
  videoUpload.single("animationVideo"),
  function (req, res, next) {
    console.log({ file: req.file });
    res.send(req.file);
  }
);
app.post(
  "/frames/:imageName",
  upload.single("frame"),
  function (req, res, next) {
    console.log({ file: req.file });
    res.send(req.file);
  }
);

app.delete("/frames/:imageName", (req, res) => {
  const { imageName } = req.params;

  fs.unlink(`./frames/${imageName}`, (err) => {
    if (err) {
      res.status(500).json({ err });
    }

    res.status(204).json(`${imageName} was deleted successfully`);
  });
});

app.use(express.static("frames"));

mongoose
  .connect(
    "mongodb+srv://shdn:shdn9431@cluster0.jw5ey.mongodb.net/animation?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(80, () => {
      console.log("app running on http://localhost:3001");
    });
  })
  .catch((err) => console.log(err));
