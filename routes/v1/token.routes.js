const express = require("express");
const {
  CreateNewToken,
  FindValidToken,
  AddMoney,
  DeleteToken,
} = require("../../controllers/token.controller");

const router = express.Router();

router.post("/addToken", CreateNewToken);
router.get("/getValidToken", FindValidToken);
router.patch("/addMoney", AddMoney);

router.route("/manage-token/:id").delete(DeleteToken);

module.exports = router;
