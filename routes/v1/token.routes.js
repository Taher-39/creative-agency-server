const express = require("express");
const {
  CreateNewToken,
  FindValidToken,
  AddMoney,
  DeleteToken,
  UpdateToken,
  getSingleToken,
} = require("../../controllers/token.controller");

const router = express.Router();

router.post("/addToken", CreateNewToken);
router.get("/getValidToken", FindValidToken);
router.patch("/addMoney", AddMoney);
router.get("/getSingleToken/:id", getSingleToken);

router.route("/manage-token/:id").delete(DeleteToken).patch(UpdateToken);

module.exports = router;
