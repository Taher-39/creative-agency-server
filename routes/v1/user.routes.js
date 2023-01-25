import express from "express";
import { registerUser, authUser } from "../../controllers/user.controller.js";

const router = express.Router();

router.post("/resisterUser", registerUser);
router.post("/authUser", authUser);

export default router;
