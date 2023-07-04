import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/OrderCotroller.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const routes = Router();

routes.get("/", getOrders);
routes.get("/:_id", getOrder);
routes.post("/", createOrder);
routes.put("/:_id", adminAuth, updateOrder);
routes.delete("/:_id", adminAuth, deleteOrder);

export default routes;