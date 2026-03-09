import express from "express";
import User from "../models/User.js";
import  protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

export default router;