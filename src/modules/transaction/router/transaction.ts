import { Router } from 'express';

const transactionRouter = Router();

transactionRouter.get('/', (req, res) => {
    res.send("Hello");
})

export default transactionRouter;