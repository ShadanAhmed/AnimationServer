const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnimationSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  frameRate: {
    type: Number,
    required: true,
  },
  frames: [
    {
      currentFrameImageWithoutBackground: { type: String },
      currentFrameImage: { type: String },
      currentFrameImageTransparent: { type: String },
      previousFrameImage: { type: String },
    },
  ],
});

module.exports = mongoose.model("Animation", AnimationSchema);
