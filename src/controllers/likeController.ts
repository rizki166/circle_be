import * as likeService  from "../services/likeService"
import { Request, Response } from "express";

export const getLikes = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.params;
        const likes = await likeService.getLikes(+threadId);
        res.json({
            status: true,
            message: "success",
            data: likes
        });
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
    
}

export const createLike = async (req: Request, res: Response) => {
    try {
        const {threadId  } = req.body;
        const userId = res.locals.user;

        const like = await likeService.createLike({
            threadId,
            userId
        });
        res.json({
            status: true,
            message: "success",
         
        });
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}