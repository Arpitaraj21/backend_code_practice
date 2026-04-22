import express from "express";
import {
  handleSignup,
  handleLogin,
  handleProfileEdit,
  handleDeleteProfile
} from "../controllers/user.js";

import { verifyToken } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.post("/edit-profile", handleProfileEdit, verifyToken);

router.post('/delete-profile',handleDeleteProfile, verifyToken);

export default router;
