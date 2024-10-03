import { Router } from "express";
import transactionRouter from "../modules/transaction/router/transaction";
import userRouter from "../modules/user/router/user";

const routes = Router();
routes.use('/transaction', transactionRouter);
routes.use('/user', userRouter)

export default routes;