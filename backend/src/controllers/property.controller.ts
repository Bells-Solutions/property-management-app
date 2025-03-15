import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProperty = async (req: Request, res: Response): Promise<void> => {
    try {
        const property = await prisma.property.create({
            data: { ...req.body, ownerId: req.auth?.sub },
        });
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: "Error creating property", error });
    }
};

export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const properties = await prisma.property.findMany();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties", error });
    }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
    try {
        const property = await prisma.property.findUnique({
            where: { id: req.params.id },
        });
        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: "Error fetching property", error });
    }
};
