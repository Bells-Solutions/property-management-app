import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as any,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.auth ||
      !roles.includes((req.auth as any)["https://your-api/roles"])
    ) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export default checkJwt;
