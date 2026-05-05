import express from "express";
import {
  handleGetProfileDetails,
  handleUpdateProfileDetails,
  handleDeleteUserProfile
} from '../controllers/profile.js'

import { verifyToken } from "../middlewares/authorization.js";

const router = express.Router();

router.get("/profile-details", verifyToken, handleGetProfileDetails);

router.patch("/edit-profile", verifyToken, handleUpdateProfileDetails);

router.delete('/delete-profile', verifyToken, handleDeleteUserProfile);

export default router;