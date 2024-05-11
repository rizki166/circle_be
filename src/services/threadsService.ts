import { exist } from 'joi';
import db from '../db'
import { Ithread } from '../types/app';

export const getThreads = async () => {
    return await db.thread.findMany({
       where: {
          threadId: null,
       },orderBy: {
         createdAt: 'desc' 
      },
       include: {
          image: {
             select: {
                image: true,
             },
          },
          author: {
            include: {
               profile: {
                  select: {
                     avatar: true,
                  },
               },
            }
          },
          _count: {
             select: {
                replies: true,
                like: true
             },
          },
       },
    });
 };
 

export const getThread = async (id:number) => {
    return await db.thread.findFirst({
        where: {
            id,
            threadId: null
        },
        include: {
            image: {
                select: {
                    image: true,
                }
            },
            author: {
               select: {
                  id: true,
                  username: true,
                  fullname: true,
                  profile: {
                     select: {
                        avatar: true
                     }
                  }
               }
            }
        }
    });
}

export const createThread = async  (payload: Ithread, 
    files:{ [fieldname: string]: 
    Express.Multer.File[] }) => {

    const thread = await db.thread.create({
        data: {
            ...payload,
            threadId: payload.threadId ? +payload.threadId : null
        }
    })
  if(files.image) {
     await db.threadImage.createMany({
        data: files.image.map((image) => ({
            image: image.filename,
            threadId: thread.id
        }))
    })
  }
    return thread
}

export const deleteThread = async (idThread: number, userId: number) => {
    const existedThread = await db.thread.findFirst({
       where: {
          id: idThread,
       },
    });
 
    if (!existedThread) {
       throw new Error("Thread not found");
    }
 
    if (existedThread.userId !== userId) {
       throw new Error("You don't have permission to delete this thread");
    }
 
    await db.thread.delete({
       where: {
          id: idThread,
       },
    });
 
    await db.threadImage.deleteMany({
       where: {
          threadId: idThread,
       },
    });
 
    return true;
 };

 export const getReplies = async (threadId: number) => {
    return await db.thread.findMany({
       where: {
          threadId,
       },
       include: {
          image: {
             select: {
                image: true,
             },
          },author: {
            include: {
               profile: {
                  select: {
                     avatar: true,
                  },
               },
            }
          },
          _count: {
             select: {
                replies: true,
                like: true
             },
          },
       },
    });
 };