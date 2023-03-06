const express = require("express");
const controller = require("../../controller/animation/index");

const router = express.Router();

router.post("/", controller.postAnimationController);
router.get("/:id", controller.getAnimationController);
router.delete("/:id", controller.deleteAnimationController);
router.patch("/:id", controller.patchAnimationController);
router.get("/", controller.getAllAnimationsController);

module.exports = router;
