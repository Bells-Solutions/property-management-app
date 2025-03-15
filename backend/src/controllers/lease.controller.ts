import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLease = async (req: Request, res: Response): Promise<void> => {
    try {
        const lease = await prisma.lease.create({ data: req.body });
        res.status(201).json(lease);
    } catch (error) {
        res.status(500).json({ message: "Error creating lease", error });
    }
};

export const getLeases = async (req: Request, res: Response): Promise<void> => {
    try {
        const leases = await prisma.lease.findMany();
        res.json(leases);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leases", error });
    }
};
