const express = require("express");
const {
  postReview,
  getReview,
  isClient,
} = require("../../controllers/review.controler");

const router = express.Router();

router.post("/postReview", postReview);
router.post("/isClient", isClient);
router.get("/getReview", getReview);

module.exports = router;
