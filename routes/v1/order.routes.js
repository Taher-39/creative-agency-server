const express = require("express");
const orderController = require("../../controllers/order.controller");

const router = express.Router();

//post order with img
router.post("/uploadOrder", orderController.uploadOrder);

//get total orders
router.get("/getTotalOrders", orderController.totalOrders);

//get order by email
router.get("/getUserOrders", orderController.singleOrder);

//change order status
router.patch("/updateStatus/:id", orderController.changeStatus);

module.exports = router;
