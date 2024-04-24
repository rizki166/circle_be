import { Router } from "express";
import userRouter from "./userRouter";
import profileRouter from "./profileRouter"
import threadRouter from "./threadRouter";
import likeRouter from "./likeRouter";
import followerRouter from "./followRouter";
import express from "express";
import path from "path";


const router = Router()
router.use("/uploads", express.static( "src/uploads"));
// router.use("/uploads", express.static(path.join(__dirname, "../uploads")));
router.use('/', userRouter);
router.use("/", profileRouter);
router.use("/", threadRouter)
router.use("/", likeRouter)
router.use("/", followerRouter)

export default router