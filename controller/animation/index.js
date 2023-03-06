const Animation = require("../../models/Animation");

module.exports.postAnimationController = async (req, res) => {
  const { name, frameRate, frames } = req.body;
  console.log({ name, frameRate, frames });

  try {
    const animation = new Animation({
      name: name,
      frameRate: frameRate,
      frames: frames,
    });
    const result = await animation.save();

    res.status(201).json({ animation: result });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAnimationController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Animation.findById(id);
    res.status(200).json({ animation: result });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAllAnimationsController = async (req, res) => {
  try {
    const result = await Animation.find();
    res.status(200).json({ animation: result });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.patchAnimationController = async (req, res) => {
  const { frames, name, frameRate } = req.body;
  const { id } = req.params;
  try {
    if (frames) {
      const result = await Animation.findByIdAndUpdate(id, { frames: frames });
      res.status(204).json({ animation: result });
    } else {
      const result = await Animation.findByIdAndUpdate(id, {
        name: name,
        frameRate: frameRate,
      });
      res.status(204).json({ animation: result });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.deleteAnimationController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Animation.findByIdAndDelete(id);
    res.status(204).json({ animation: result });
  } catch (err) {
    res.status(500).json(err);
  }
};
