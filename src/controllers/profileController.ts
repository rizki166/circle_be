import { Request, Response } from "express";
import * as  profileService from "../services/profileService";

export const updateProfile = async (req: Request, res: Response) => {
    try {
       //    const { username, password } = req.body;
       const userId = res.locals.user;
       const { body } = req;
       const files = req.files as { [fieldname: string]: Express.Multer.File[] };
       const cover = files.cover[0].filename;
       const avatar = files.avatar[0].filename;
 
       if (cover) {
          body.cover = cover;
       }
 
       if (avatar) {
          body.avatar = avatar;
       }
 
       await profileService.updateProfile(userId, body);
 
       res.json({
          status: true,
          message: "success",
       });
    } catch (error) {
       const err = error as unknown as Error;
       console.log(err);
 
       res.status(500).json({
          status: false,
          message: err.message,
       });
    }
 };
 export const getProfile = async (req: Request, res: Response) => {
    try {
       const userId = res.locals.user;
 
       const profile = await profileService.getProfile(userId);
 
       res.json({
          status: true,
          message: "success",
          data: profile,
       });
    } catch (error) {
       const err = error as unknown as Error;
       console.log(err);
 
       res.status(500).json({
          status: false,
          message: err.message,
       });
    }
 };
 
 export const getProfileById = async (req: Request, res: Response) => {
    try {
       const { id } = req.params;
 
       const profile = await profileService.getProfile(+id);
 
       res.json({
          status: true,
          message: "success",
          data: profile,
       });
    } catch (error) {
       const err = error as unknown as Error;
       console.log(err);
 
       res.status(500).json({
          status: false,
          message: err.message,
       });
    }
 };