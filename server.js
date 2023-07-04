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


const app= express();

app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/products",products);
app.use("/api/user",users);
app.use("/api/cart",carts)
app.use("/api/order",orders)
app.use(errorHandler);
app.use(notFound);





app.listen(5000,()=> console.log("server is running on port 5000".yellow.bold.underline));