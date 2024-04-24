import { Router } from "express";
import { getUsers, login, register } from "../controllers/UserController";
import authentication from "../middleware/authentications";

const userRouter = Router()


userRouter.post("/register", register)
userRouter.post("/login",login)
userRouter.get("/users",getUsers)


export default userRouter