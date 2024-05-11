
import db from '../db'
import { IProfile } from '../types/app'

export const updateProfile = async (userId: number, payload:IProfile) => {
    const dataToUpdate : Partial<IProfile> = {}
    const userUpdate : { [key: string]: string} = {}
 
    if(payload.fullname !== undefined && payload.fullname !== null) {
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                fullname: payload.fullname
            }
        })
    }

    if(payload.username !== undefined && payload.username !== null) {
        await db.user.update({ 
            where: {
                id: userId
            },
            data: {
                username: payload.username
            }
        })
    }

        if(payload.bio !== undefined && payload.bio !== null) {
            dataToUpdate.bio = payload.bio
        }

        if(payload.avatar !== undefined && payload.avatar !== null) {
            dataToUpdate.avatar = payload.avatar
        }

        if(payload.cover !== undefined && payload.cover !== null) { 
            dataToUpdate.cover = payload.cover
        }
    
      if(Object.keys(dataToUpdate).length) {
      await db.user.update({
        where: 
            {id: userId},
        data: userUpdate
      
    })
    return await db.profile.update({
        where: {
            userId,
        },
        data: dataToUpdate
    })
    
      }

    // return await db.profile.update({
    //     where: {
    //         userId,
    //     },
    //     data: {
            
    //         bio: payload.bio
    //     }
    // })

}
export const getProfile = async (userId: number) => {
    return await db.profile.findFirst({
       where: {
          userId,
       },
       include: {
          user: {
            select: {
                fullname:true,
                username: true,
                id: true,
                _count:{
                    select:{
                        following: true,
                        follower: true
                    }
                }
            }
          }
       }
    });
 };