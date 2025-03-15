import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";

jest.mock("@prisma/client", () => ({
    PrismaClient: jest.fn(() => mockPrisma),
}));

const mockPrisma = mockDeep<PrismaClient>();

beforeEach(() => {
    mockReset(mockPrisma); // Reset mock before each test
});

export default mockPrisma;
