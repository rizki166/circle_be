
import db from "../db"
import { registerValidation } from "../lib/validation/register";
import { IRegister } from "../types/app";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const getUsers = async () => {
    return await db.user.findMany({
        include: {
            profile: true
        }});
};


export const getUser = async (id: number) => {
    return await db.user.findFirst({
        where: {
            id
        },
    });
};

export const register = async (payload: IRegister) => {
    const { error, value } = registerValidation.validate(payload);
    if (error) {
       throw new Error(error.details[0].message);
    }
 
    const isExist = await db.user.findFirst({
       where: {
          OR: [
             {
                username: value.username
             },
             {
                email: value.email,
             },
          ],
       },
    });  

    
 
    if (isExist) {
       throw new Error("Username or email already exist");
    }
 
    const hashedPassword = await bcrypt.hash(value.password, 10);
 
    value.password = hashedPassword;
 
    const user = await db.user.create({
       data: {
          ...value,
       },
    });

    const profile = await db.profile.create({
      data: {
        userId: user.id
      }
    })

    return{user, profile }
}

export const login = async (
    username: string,
    password: string
 ): Promise<string> => {
    const user = await db.user.findFirst({
       where: {
          OR: [
             {
                username,
             },
             {
                email: username,
             },
          ],
       },
    });
    console.log(user);
    
 
    if (!user) {
       throw new Error("User or password is not valid");
    }
 
    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
       throw new Error("User or password is not valid");
    }
 
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
       expiresIn: "1d",
    });
 
    return token;
 };
 export const getSuggestedUsers = async (userId: number) => {
   // Ambil semua pengguna yang belum diikuti oleh pengguna dengan userId tertentu
   const users = await db.user.findMany({
       where: {
           NOT: {
               id: userId, // Exclude the logged-in user
           },
       },
       include: {
           profile: true,
       },
   });

   const followedUserIds = (await db.follow.findMany({
       where: {
           followerId: userId,
       },
       select: {
           followingId: true,
       },
   })).map((follow) => follow.followingId);

   // Filter pengguna yang telah diikuti oleh pengguna yang sedang masuk
   const suggestedUsers = users.filter((user) => !followedUserIds.includes(user.id));

   return suggestedUsers;
};

 