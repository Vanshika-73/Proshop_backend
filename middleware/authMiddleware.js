import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserModel.js";
import expressAsyncHandler from "express-async-handler";

dotenv.config();

const userAuth = expressAsyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) throw new Error("no token found");
  let { id } = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
  if (!id) throw new Error("invlid token");

  const user = await User.findOne({ _id: id });
  req.user = { ...user, _id: id };
  next();
});

const adminAuth = expressAsyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) throw new Error("no token found");
  let { id } = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
  if (!id) throw new Error("invlid token");
  const { isAdmin } = await User.findOne({ _id: id });
  if (!isAdmin) throw new Error("you not authorized");
  next();
});

export { userAuth, adminAuth };
