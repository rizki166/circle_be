import { Router } from "express";
import { checkFollowStatus, follow, getFollowers, getFollowings } from "../controllers/followController";
import authentication from "../middleware/authentications";
const followerRouter = Router();

followerRouter.post("/follow", authentication, follow);
followerRouter.get("/follower", authentication, getFollowers);
followerRouter.get("/following", authentication, getFollowings);
// followerRouter.get("/check-follow/:id_user", authentication, getCurrentFollow);
followerRouter.get("/check-follow/:id_user", authentication, checkFollowStatus);
export default followerRouter;