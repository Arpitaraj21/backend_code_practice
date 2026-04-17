import express from "express";
import {
  handleSignup,
  handleLogin,
  handleProfileEdit,
} from "../controllers/user";
import verifyToken from "../middlewares/authorization";

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.post("/edit-profile", handleProfileEdit, verifyToken);

export default router;
