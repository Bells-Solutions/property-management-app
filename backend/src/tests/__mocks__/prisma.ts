import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";

jest.mock("@prisma/client", () => ({
    PrismaClient: jest.fn(() => mockPrisma),
}));

const mockPrisma = mockDeep<PrismaClient>();

export default mockPrisma;
