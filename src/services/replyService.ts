import db from "../db"

export const  getReplies = async (threadId: number) => {
    return await db.thread.findMany({
        where: {
            threadId
        }
    })
}