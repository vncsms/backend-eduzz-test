import { Router } from 'express';
import TransactionController from '../controller/transactionController';

const transactionRouter = Router();

const transactionController = new TransactionController();
transactionRouter.post('/', transactionController.create);

export default transactionRouter;