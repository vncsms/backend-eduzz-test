import { Router } from 'express';
import CryptoTransactionController from '../controller/cryptoTransactionController';

const cryptoTransactionRouter = Router();

const cryptoTransactionController = new CryptoTransactionController();
cryptoTransactionRouter.post('/', cryptoTransactionController.create);

export default cryptoTransactionRouter;