import { Router } from "express";
import transactionRouter from "../modules/transaction/router/transaction";
import userRouter from "../modules/user/router/user";
import cryptoTransactionRouter from "../modules/cryptoTransaction/router/cryptoTransaction";

const routes = Router();
routes.use('/transaction', transactionRouter);
routes.use('/user', userRouter)
routes.use('/cryptoTransaction', cryptoTransactionRouter);

export default routes;