import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import products from "./routes/ProductRoute.js";
import cors from "cors"
import users from "./routes/UserRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import carts from "./routes/CartRoute.js";
import orders from './routes/OrderRoute.js'


const server= express();

server.use(express.json());
server.use(cors());

connectDB();
server.use("/api/products",products);
server.use("/api/user",users);
server.use("/api/cart",carts)
server.use("/api/order",orders)
server.use(errorHandler);
server.use(notFound);





server.listen(5000,()=> console.log("server is running on port 5000".yellow.bold.underline));