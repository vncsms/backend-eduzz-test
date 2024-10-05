import { Router } from 'express';
import AccountController from '../controller/accountController';

const accountRouter = Router();

const accountController = new AccountController();
accountRouter.get('/balance', accountController.getBalance);
accountRouter.get('/extract', accountController.getExtract);
accountRouter.get('/volume', accountController.getVolume);

export default accountRouter;