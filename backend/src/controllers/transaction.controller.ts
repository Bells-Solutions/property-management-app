import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const makePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const transaction = await prisma.transaction.create({ data: req.body });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Error processing payment", error });
    }
};

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await prisma.transaction.findMany();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error });
    }
};
