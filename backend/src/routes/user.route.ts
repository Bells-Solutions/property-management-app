import { Router, Request, Response } from "express";
import checkJwt from "../middlewares/auth.middleware";
import { getUserProfile } from "../controllers/user.controller";

const router = Router();

// Protected route for all authenticated users
router.get("/profile", checkJwt, getUserProfile);

export default router;
