import db from "../db";

export const follow = async (followerId: number, followingId: number) => {
   const existingFollow = await db.follow.findFirst({
      where: {
         followerId,
         followingId,
      },
   });

   if (existingFollow) {
      await db.follow.deleteMany({
         where: {
            followerId,
            followingId,
         },
      });

      return "unfollowing successful";
   }

    await db.follow.create({
      data: {
         followerId,
         followingId,
      },
   });

   return "following successful";
};

export const getCurrentFollow = async (userId: number, followingId: number) => {
   return await db.follow.findFirst({
      where: {
         followingId,
        followerId: userId
      }
   })
}
