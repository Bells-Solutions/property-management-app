import { Request, Response } from "express";

export const getUserProfile = (req: Request, res: Response): void => {
  if (!req.auth) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.json({
    message: "Authenticated user data",
    user: req.auth,
  });
};
