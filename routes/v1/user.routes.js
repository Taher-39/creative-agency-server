const express = require("express");
const { registerUser, authUser } = require("../../controllers/user.controller");

const router = express.Router();

router.post("/resisterUser", registerUser);
router.post("/authUser", authUser);

module.exports = router;
