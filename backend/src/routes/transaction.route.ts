import { Router } from "express";
import checkJwt from "../middlewares/auth.middleware";
import { makePayment, getTransactions } from "../controllers/transaction.controller";

const router = Router();

router.post("/pay", checkJwt, makePayment);
router.get("/", checkJwt, getTransactions);

export default router;
