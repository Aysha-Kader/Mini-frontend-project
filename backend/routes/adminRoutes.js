// routes/adminRoutes.js
import express from "express";
import {
  getStats,
  getUsers,
  approveUser,
  rejectUser,
  banUser,
  getRecipesAdmin,
  deleteRecipeAdmin,
 
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(protect, isAdmin);

// stats
router.get("/stats", getStats);

// users
router.get("/users", getUsers);
router.put("/users/:id/approve", approveUser);
router.put("/users/:id/reject", rejectUser);
router.put("/users/:id/ban", banUser);

// recipes
router.get("/recipes", getRecipesAdmin);
router.delete("/recipes/:id", deleteRecipeAdmin);


export default router;