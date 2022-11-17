const express = require("express");
const { addNewAdmin, isAdmin } = require("../../controllers/admin.controller");

const router = express.Router();

router.post("/addAdmin", addNewAdmin);
router.post("/isAdmin", isAdmin);

module.exports = router;
