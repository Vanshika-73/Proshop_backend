import { Router } from "express";
import { addCartItem, clearCart, createUserCart, deleteCartItem, getUserCart,updateQty } from "../controllers/CartController.js";

const routes= Router();

routes.get("/:user",getUserCart);
routes.post("/:user",createUserCart);
routes.put("/:user",addCartItem);
routes.put("/qty/:user",updateQty);
routes.delete("/:user/:_id",deleteCartItem);
routes.put("/clear/:user",clearCart);
export default routes;