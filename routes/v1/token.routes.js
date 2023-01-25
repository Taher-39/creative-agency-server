import express from "express";
import {
  CreateNewToken,
  FindValidToken,
  AddMoney,
  DeleteToken,
  UpdateToken,
  getSingleToken,
} from "../../controllers/token.controller.js";

const router = express.Router();

router.post("/addToken", CreateNewToken);
router.get("/getValidToken", FindValidToken);
router.patch("/addMoney", AddMoney);
router.get("/getSingleToken/:id", getSingleToken);

router.route("/manage-token/:id").delete(DeleteToken).patch(UpdateToken);

export default router;
