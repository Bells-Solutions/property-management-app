import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        sub: string;
        scope?: string;
        [key: string]: any; // Allow other JWT claims
      };
    }
  }
}
