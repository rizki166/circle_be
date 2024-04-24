import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import db from "./src/db"
import path from "path";
import router from "./src/Route"
import cors from "cors"
import { follow, getFollowers } from "./src/controllers/followController";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(router);

app.get('/', async (req: Request, res: Response) => {
    try {
        const listUser = await db.user.findMany();
        const singleUser = await db.user.findFirst({
            where: {
                id: 1,
            },
        });

        res.send({
            listUser,
            singleUser
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/follow", follow);
app.get("/followers", getFollowers);

app.listen(PORT, async () => {
    try {
        await db.$connect();
        console.log(`Server is running on PORT ${PORT}`);
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
});
