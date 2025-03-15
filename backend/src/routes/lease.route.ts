import { Router } from "express";
import checkJwt from "../middlewares/auth.middleware";
import { createLease, getLeases } from "../controllers/lease.controller";

const router = Router();

router.post("/", checkJwt, createLease);
router.get("/", checkJwt, getLeases);

export default router;
