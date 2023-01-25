import express from "express";
import {
  addService,
  getServices,
  getSingleService,
  deleteService,
  editService,
} from "../../controllers/service.controller.js";
const router = express.Router();

router.post("/addService", addService);

router.get("/getService", getServices);
router.get("/get-single-service/:id", getSingleService);

router.route("/manage/:id").delete(deleteService).patch(editService);

export default router;
