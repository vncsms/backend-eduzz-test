import { Router } from 'express';
import CryptoTransactionController from '../controller/cryptoTransactionController';
import ExecutionPriceController from '../controller/executionPriceController';

const cryptoTransactionRouter = Router();

const cryptoTransactionController = new CryptoTransactionController();
const executionPriceController = new ExecutionPriceController();

cryptoTransactionRouter.post('/', cryptoTransactionController.create);
cryptoTransactionRouter.get('/executionPrice', executionPriceController.get)

export default cryptoTransactionRouter;