import express from "express";
import { addNewAdmin, isAdmin } from "../../controllers/admin.controller.js";

const router = express.Router();

router.post("/addAdmin", addNewAdmin);
router.post("/isAdmin", isAdmin);

export default router;
