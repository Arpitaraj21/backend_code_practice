import express from "express";
import {
  handleProfileEdit,
  handleDeleteProfile,
  handleGetProfileDetails
} from '../controllers/profile.js'

import { verifyToken } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/edit-profile", verifyToken, handleProfileEdit);

router.get("/profile-details", verifyToken, handleGetProfileDetails);

router.post('/delete-profile',verifyToken, handleDeleteProfile);

export default router;