import { Router } from "express";
import { getLikes, createLike, getCurrentLike } from "../controllers/likeController";
import authentication from "../middleware/authentications";

const likeRouter = Router()


likeRouter.post("/likes", authentication,createLike)
likeRouter.get("/likes/threadId",authentication,getLikes)
likeRouter.get("/like/:threadId",authentication,getCurrentLike)

export default likeRouter