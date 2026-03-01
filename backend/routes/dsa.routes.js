import express from "express";
import { getDSA, createDSA } from "../controllers/dsa.controller.js";

const router = express.Router();

router.get("/", getDSA);
router.post("/", createDSA);

export default router;
