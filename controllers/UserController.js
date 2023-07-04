import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// @desc -  fetch all users
// @route - GET /api/user
//@access - Private
const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

// @desc -  to user login
// @route - POST /api/user/login
//@access - Private
const userLogin = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (!result) throw new Error("email is invalid");
    let check = await bcrypt.compare(password, result.password);
    if (!check) throw new Error("password isn't correct");
    else
      res.status(200).send({
        _id: result._id,
        name: result.name,
        email: result.email,
        isAdmin: result.isAdmin,
        token: generateToken(result._id),
      });
  } catch (error) {
    next(error);
  }
});

// @desc -  to create new user
// @route - POST /api/user/register
//@access - Public
const userRegister = asyncHandler(async (req, res, next) => {
  try {
    const { email: userEmail, password } = req.body;
    const existUser = await User.findOne({ email: userEmail });
    if (existUser) throw new Error("email already exists");
    req.body.password = await bcrypt.hash(password, 10);
    const { _id, name, email, isAdmin } = await User.create(req.body);
    res.status(200).send({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } catch (error) {
    next(error);
  }
});

// @desc -  to update user
// @route - PUT /api/user
//@access - Private
const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = req.body;
    const { name, email, isAdmin } = await User.findByIdAndUpdate(
      { _id },
      { ...data },
      { new: true }
    );
    res.status(200).send({ _id,name, email, isAdmin, token: generateToken(_id), });
  } catch (error) {
    next(error);
  }
});

const updateAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const { name, email, isAdmin } = await User.findByIdAndUpdate(
      { _id },
      { ...data },
      { new: true }
    );
    res.status(200).send({ _id, name, email, isAdmin });
  } catch (error) {
    next(error);
  }
});

// @desc -  to delete user
// @route - DElETE /api/user/:_id
//@access - Private
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    console.log("req",req.params)
    const { _id } = req.params;
    console.log("id",_id);
    const result = await User.findByIdAndRemove({ _id });
    // console.log("res",result.deletedCount);
    // if (result.deletedCount === 1) {
      let users = await User.find();
      // console.log("ds",users);
      res.status(200).send(users);
    // } else throw new Error("something went wrong! try again.");
  } catch (error) {
    next(error);
  }
});

export {
  getUsers,
  userLogin,
  userRegister,
  updateAdmin,
  updateUser,
  deleteUser,
};
