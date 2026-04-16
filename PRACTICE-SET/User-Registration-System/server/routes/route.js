import express from "express";
import { handleSignup } from "../controllers/user";

const router = express.Router();

router.post("/authentication", handleSignup);

export default router;
