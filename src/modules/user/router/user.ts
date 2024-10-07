import { Router } from "express";
import UserController from "../controller/userController";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.post("/login", userController.login);

export default userRouter;
