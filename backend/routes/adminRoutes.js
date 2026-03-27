import express from "express";
import { getUsers, approveUser } from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getUsers);
router.put("/approve/:id", protect, adminOnly, approveUser);

export default router;
