import express from "express";
import {
  handleSignup,
  handleLogin,
} from "../controllers/user.js";

import { verifyToken } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

export default router;
