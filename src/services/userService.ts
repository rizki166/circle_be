import db from "../db";
import { registerValidation } from "../lib/validation/register";
import { IRegister } from "../types/app";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types/app";

export const getUsers = async (condition: {username: string}, loggeinId: number) => {
   return await db.user.findMany({
    where: {
        username: {
            contains: condition.username
        },
        NOT: {
            id: loggeinId
        },
    },
    select: {
        id: true,
        username: true,
        fullname: true,
        profile: {
            select: {
                avatar: true,
                bio: true,
                cover: true
            }
        }
    }
   })
};

export const getUser = async (id: number) => {
    return await db.user.findFirst({
        where: {
            id
        }
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
                    email: value.email
                }
            ]
        }
    });

    if (isExist) {
        throw new Error("Username or email already exist");
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    value.password = hashedPassword;

    const user = await db.user.create({
        data: {
            ...value
        }
    });

    const profile = await db.profile.create({
        data: {
            userId: user.id
        }
    });

    return { user, profile };
};

export const login = async (username: string, password: string): Promise<string> => {
    const user = await db.user.findFirst({
        where: {
            OR: [
                {
                    username
                },
                {
                    email: username
                }
            ]
        }
    });

    if (!user) {
        throw new Error("User or password is not valid");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("User or password is not valid");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
        expiresIn: "1d"
    });

    return token;
};

export const getSuggestedUsers = async (userId: number) => {
    try {
        // Ambil semua pengguna kecuali pengguna yang sudah diikuti
        const users = await db.user.findMany({
            where: {
                NOT: {
                    id: userId 
                }
            },
            include: {
                profile: true
            }
        });

        // Ambil daftar pengguna yang sudah diikuti
        const followedUserIds = (await db.follow.findMany({
            where: {
                followerId: userId
            },
            select: {
                followingId: true
            }
        })).map((follow) => follow.followingId);

        // Filter pengguna yang belum diikuti
        const suggestedUsers = users.filter((user) => !followedUserIds.includes(user.id));

        // Ambil lima pengguna pertama dari daftar pengguna yang belum diikuti
        const finalSuggestedUsers = suggestedUsers.slice(0, 4);

        return finalSuggestedUsers;
    } catch (error) {
        console.error("Error in getSuggestedUsers:", error);
        throw new Error("Failed to fetch suggested users.");
    }
};


// Fungsi untuk memilih pengguna secara acak dari array pengguna
const getRandomUsers = (users: IUser[], count: number): IUser[] => {
    const randomUsers: IUser[] = [];
    const totalUsers = users.length;
    const indexes = [];

    // Membuat array indeks dari 0 hingga totalUsers - 1
    for (let i = 0; i < totalUsers; i++) {
        indexes.push(i);
    }

    // Memilih count indeks secara acak dari array indeks
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * indexes.length);
        const selectedIndex = indexes.splice(randomIndex, 1)[0];
        randomUsers.push(users[selectedIndex]);
    }

    return randomUsers;
};
