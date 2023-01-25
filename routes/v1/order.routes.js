import express from "express";
import {
  uploadOrder,
  totalOrders,
  singleOrder,
  changeStatus,
} from "../../controllers/order.controller.js";

const router = express.Router();

//post order with img
router.post("/uploadOrder", uploadOrder);

//get total orders
router.get("/getTotalOrders", totalOrders);

//get order by email
router.get("/getUserOrders", singleOrder);

//change order status
router.patch("/updateStatus/:id", changeStatus);

export default router;
