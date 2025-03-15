import request from "supertest";
import main from "../main";
import mockPrisma from "./jest.setup";

describe("User API Endpoints", () => {
    beforeEach(() => {
        mockPrisma.user.findUnique.mockReset(); // Reset mock before each test
    });

    describe("User API Endpoints", () => {
        it("should return a 401 Unauthorized when no token is provided", async () => {
            const res = await request(main).get("/api/users/profile");
            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Unauthorized");
        });

        it("should return user profile if authenticated", async () => {});
    });
});
