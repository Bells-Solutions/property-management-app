import { Request } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, UserRole, User } from "@prisma/client";
import jwksClient from "jwks-rsa";

const prisma = new PrismaClient();

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
});

const getKey = (header: any, callback: any) => {
    client.getSigningKey(header.kid, function (err, key) {
        if (err) return callback(err);

        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
    });
};

/**Extract the user from the token
 * @param req - Request object
 * @returns {Promise<User>} User object
 */
export const getUserFromToken = async (req: Request): Promise<User> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new Error("No token provided");
    }

    const decoded = await new Promise<jwt.JwtPayload>((resolve, reject) => {
        jwt.verify(
            token,
            getKey,
            {
                audience: process.env.AUTH0_AUDIENCE,
                issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            },
            (err, payload) => {
                if (err || !payload) {
                    reject(err);
                    return reject("Invalid token");
                }

                resolve(payload as jwt.JwtPayload);
            },
        );
    });

    if (!decoded) {
        throw new Error("Invalid token");
    }

    if (!decoded.email || !decoded.sub) {
        throw new Error("Missing required fields in token");
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, {}, async (err: any, decoded) => {
            if (err) {
                reject(err);
                return;
            }

            const user = await prisma.user.upsert({
                where: { email: (decoded as jwt.JwtPayload).email },
                update: {},
                create: {
                    email: (decoded as jwt.JwtPayload).email,
                    auth0Id: (decoded as jwt.JwtPayload).sub || "",
                    role: UserRole.ADMIN,
                },
            });

            if (!user) {
                reject(new Error("Error creating user"));
                return;
            }

            resolve(user);
        });
    });
};
