import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMaintenanceRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const request = await prisma.maintenanceRequest.create({ data: req.body });
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: "Error creating maintenance request", error });
    }
};

export const getMaintenanceRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await prisma.maintenanceRequest.findMany();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching maintenance requests", error });
    }
};
