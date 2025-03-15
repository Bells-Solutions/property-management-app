import { Router, Request, Response } from "express";
import checkJwt from "../middlewares/auth.middleware";

const router = Router();

// Protected route for all authenticated users
router.get(
  "/profile",
  checkJwt,
  async (req: Request, res: Response): Promise<void> => {
    if (!req.auth) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.json({
      message: "Authenticated user data",
      user: req.auth,
    });
  }
);

export default router;
