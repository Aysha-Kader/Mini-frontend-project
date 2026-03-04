import express from "express";
import User from "../models/User";
import  protect from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

export default router;