const express = require("express");
const serviceController = require("../../controllers/service.controller");
const router = express.Router();

router.post("/addService", serviceController.addService);

router.get("/getService", serviceController.getServices);
router.get("/get-single-service/:id", serviceController.getSingleService);

router
  .route("/manage/:id")
  .delete(serviceController.deleteService)
  .patch(serviceController.editService);

module.exports = router;
