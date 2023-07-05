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

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/products",products);
app.use("/api/user",users);
app.use("/api/cart",carts)
app.use("/api/order",orders)
app.use(errorHandler);
app.use(notFound);




const port =process.env.PORT;
app.listen(port,()=>console.log(`server is running on port ${port}`.yellow.bold.underline));
