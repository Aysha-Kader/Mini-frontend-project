import express from "express";
import { getRecipeSummary } from "../controllers/aiController.js";

const router = express.Router();

router.post("/summary", getRecipeSummary);

export default router;