import { Router } from 'express';
import CryptoTransactionController from '../controller/cryptoTransactionController';

const cryptoTransactionRouter = Router();

const cryptoTransactionController = new CryptoTransactionController();

cryptoTransactionRouter.post('/', cryptoTransactionController.create);
cryptoTransactionRouter.get('/executionPrice', cryptoTransactionController.getExecutionPrice)
cryptoTransactionRouter.get('/', cryptoTransactionController.list)
cryptoTransactionRouter.post('/sell', cryptoTransactionController.sell)

export default cryptoTransactionRouter;