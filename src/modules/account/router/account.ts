import { Router } from 'express';
import AccountController from '../controller/accountController';

const accountRouter = Router();

const accountController = new AccountController();
accountRouter.get('/balance', accountController.getBalance);

export default accountRouter;