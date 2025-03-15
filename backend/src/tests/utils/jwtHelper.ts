import jwt from "jsonwebtoken";

const TEST_USER_ID = "google-oauth2|110772573307409955297";
const TEST_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use the same secret as in your .env file

export function generateTestToken(): string {
    return jwt.sign({ userId: TEST_USER_ID }, TEST_SECRET, {
        expiresIn: "1h",
    });
}
