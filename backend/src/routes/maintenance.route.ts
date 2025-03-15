import checkJwt from "../middlewares/auth.middleware";
import { Router } from "express";
import {
    createMaintenanceRequest,
    getMaintenanceRequests,
} from "../controllers/maintenance.controller";

const router = Router();

router.post("/", checkJwt, createMaintenanceRequest);
router.get("/", checkJwt, getMaintenanceRequests);

export default router;
