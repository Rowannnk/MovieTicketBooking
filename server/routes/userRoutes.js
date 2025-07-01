import express from "express";
import {
  getFavorites,
  getUserBookings,
  updateFavorite,
  userLogin,
  userRegister,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/bookings", protectUser, getUserBookings);
userRouter.post("/update-favorite", protectUser, updateFavorite);
userRouter.get("/favorites", protectUser, getFavorites);

export default userRouter;
