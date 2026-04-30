import {
  handleProfileEdit,
  handleDeleteProfile,
  handleGetProfileDetails
} from '../controllers/profile.js'

import { verifyToken } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/edit-profile", handleProfileEdit, verifyToken);

router.get("/profile-details", handleGetProfileDetails, verifyToken);

router.post('/delete-profile',handleDeleteProfile, verifyToken);

export default router;