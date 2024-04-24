import { Request, Response } from "express";
import prisma from "../db";
import * as followService from "../services/followService";

export const follow = async (req: Request, res: Response) => {
   try {
      console.log(req.body);
      const { followingId } = req.body;
      const followerId = res.locals.user;

      const follow = await followService.follow(followerId, followingId);

      res.json({
         success: true,
         message: follow,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         success: false,
         error: error,
      });
   }
};

export const getFollowers = async (req: Request, res: Response) => {
   try {
      const { followingId } = req.params;

      const followers = await prisma.follow.findMany({
         where: {
            followingId: +followingId,
         },
         select: {
            follower: {
               select: {
                  id: true,
                  fullname: true,
                  username: true,
                  profile: {
                     select: {
                        avatar: true,
                     },
                  },
               },
            },
         },
      });

      res.json({
         success: true,
         message: "success",
         data: followers,
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);
      res.status(500).json({
         success: false,
         error: error,
      });
   }
};

export const getFollowings = async (req: Request, res: Response) => {
   try {
      const { followerId } = req.params;

      const followings = await prisma.follow.findMany({
         where: {
            followerId: +followerId,
         },
         include: {
            following: {
               select: {
                  id: true,
                  fullname: true,
                  username: true,
                  profile: {
                     select: {
                        avatar: true,
                     },
                  },
               },
            },
         },
      });

      res.json({
         success: true,
         message: "success",
         data: followings,
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);

      res.status(500).json({
         success: false,
         error: err.message,
      });
   }
};