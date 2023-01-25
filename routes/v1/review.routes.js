import express from "express";
import {
  postReview,
  isClient,
  getReview
} from "../../controllers/review.controler.js";

const router = express.Router();

router.post("/postReview", postReview);
router.post("/isClient", isClient);
router.get("/getReview", getReview);

export default router;
