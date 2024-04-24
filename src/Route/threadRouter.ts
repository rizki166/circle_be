import { Router } from "express";
import authentication from "../middleware/authentications";
import uploadMiddleware from "../middleware/upload";
import { getThread } from "../controllers/threadController";
import { getThreads } from "../controllers/threadController";
import { createThread } from "../controllers/threadController";
import { getReplies } from "../controllers/threadController";
const threadRouter = Router();

threadRouter.post(
   "/thread",
   authentication,
   uploadMiddleware("image"),
   createThread
);
threadRouter.get("/threads",  getThreads);
threadRouter.get("/threads/:id",getThread);
threadRouter.get("/replies/:id",authentication, getReplies);

export default threadRouter;