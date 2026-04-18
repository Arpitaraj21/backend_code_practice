import express from "express";
import {
  handleSignup,
  handleLogin,
  handleProfileEdit,
} from "../controllers/user.js";

import { verifyToken } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.post("/edit-profile", handleProfileEdit, verifyToken);

export default router;
