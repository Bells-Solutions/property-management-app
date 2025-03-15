import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

declare module "express" {
    export interface Request {
        user?: { sub?: string; email?: string };
    }
}

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.user?.email },
            select: { email: true, role: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        res.json(user);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
        return;
    }
};
