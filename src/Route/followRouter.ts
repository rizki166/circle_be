import { Router } from "express";
import { follow, getFollowers, getFollowings } from "../controllers/followController";
import authentication from "../middleware/authentications";
const followerRouter = Router();

followerRouter.post("/follow", authentication, follow);
followerRouter.get("/follower/:followingId", authentication, getFollowers);
followerRouter.get("/following/:followerId", authentication, getFollowings);

export default followerRouter;