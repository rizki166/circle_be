import { Router } from "express";
import authentication from "../middleware/authentications";
import uploadMiddleware from "../middleware/upload";
import {
  getProfileByIds,
  updateProfile,
} from "../controllers/profileController";
import { getProfile } from "../controllers/profileController";
const profileRouter = Router();

profileRouter.patch(
  "/profile",
  authentication,
  uploadMiddleware("cover"),
  updateProfile
);
profileRouter.get("/profile", authentication, getProfile);
profileRouter.get("/profile/:id", authentication, getProfile);
profileRouter.get("/profile/:id", getProfileByIds);

export default profileRouter;
