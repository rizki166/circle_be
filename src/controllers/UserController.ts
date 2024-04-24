import { Request, Response } from "express";
import * as userService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
     const { body } = req;
console.log( body);

     const result = await userService.register(body);

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

export const login = async (req: Request, res: Response) => {
  try {
     const { username, password } = req.body;
    
    
     console.log("reqbody --->", req.body);
     
     
     const token = await userService.login(username, password);
     res.json({
        status: true,
        message: "success",
        token,
     });
  } catch (error) {
     const err = error as unknown as Error;
     res.status(500).json({
        status: false,
        message: err.message,
     });
  }
};

export const getUsers = async(req:Request, res:Response) => {
  try {
    const users = await userService.getUsers();
  
    
    res.json({
      status: true,
      message: "success",
      data: users
    })
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
       status: false,
       message: err.message,
    });
  }
}
export const getSuggestedUsers = async(req:Request, res:Response) => {
   try {
     // Dapatkan ID pengguna dari properti 'userId' objek 'Request'
     const userId = (req as any).userId;

     // Dapatkan pengguna yang disarankan (belum diikuti) untuk pengguna yang sedang masuk
     const suggestedUsers = await userService.getSuggestedUsers(userId);
 
     // Kirim respons dengan daftar pengguna yang disarankan
     res.json({
       status: true,
       message: "success",
       data: suggestedUsers
     })
   } catch (error) {
     const err = error as unknown as Error;
     res.status(500).json({
        status: false,
        message: err.message,
     });
   }
 }
