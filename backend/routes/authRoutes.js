import express from "express";
import {loginUser,registerUser} from "../controllers/authController.js";


const router=express.Router();

// Register ser
router.post("/register",registerUser);
//login user
router.post("/login",loginUser)


 
export default router;