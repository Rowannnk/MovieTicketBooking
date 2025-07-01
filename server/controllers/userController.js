import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({ success: true, token });
};
//api function to get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.user;

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api function to update favorite movie in clerk user metadata
export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const { userId } = req.user; // decoded from JWT middleware

    console.log("Received movieId:", movieId);
    console.log("User ID:", userId);

    const user = await User.findById(userId);

    console.log("User before update:", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.favorites) {
      user.favorites = [];
    }

    if (user.favorites.includes(movieId)) {
      user.favorites = user.favorites.filter(
        (item) => item.toString() !== movieId.toString()
      );
    } else {
      user.favorites.push(movieId);
    }

    await user.save();

    res.json({ success: true, message: "Favorite Movie Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api function to get favorites
export const getFavorites = async (req, res) => {
  try {
    console.log("getFavorites called for user:", req.user);

    const { userId } = req.user; // decoded JWT middleware sets this

    // Find user by id and populate favorite movies
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, movies: user.favorites || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
