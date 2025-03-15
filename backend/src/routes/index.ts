import { Router } from "express";
import userRoutes from "./user.route";
import propertyRoutes from "./property.route";
import leaseRoutes from "./lease.route";
import transactionRoutes from "./transaction.route";
import maintenanceRoutes from "./maintenance.route";

const router = Router();

router.use("/users", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/leases", leaseRoutes);
router.use("/transactions", transactionRoutes);
router.use("/maintenance", maintenanceRoutes);

export default router;
