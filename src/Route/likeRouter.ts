import { Router } from "express";
import { getLikes, createLike } from "../controllers/likeController";
import authentication from "../middleware/authentications";

const likeRouter = Router()


likeRouter.post("/likes", authentication,createLike)
likeRouter.get("/likes/threadId",authentication,getLikes)


export default likeRouter