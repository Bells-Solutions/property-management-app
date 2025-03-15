import { Router } from "express";
import checkJwt from "../middlewares/auth.middleware";
import { createProperty, getProperties, getPropertyById } from "../controllers/property.controller";

const router = Router();

router.post("/", checkJwt, createProperty);
router.get("/", getProperties);
router.get("/:id", getPropertyById);

export default router;
