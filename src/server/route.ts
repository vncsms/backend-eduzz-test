import { Router } from "express";
import transactionRouter from "../modules/transaction/router/transaction";

const routes = Router();
routes.use('/transaction', transactionRouter);

export default routes;