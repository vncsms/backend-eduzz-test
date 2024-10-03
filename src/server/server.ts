import * as dotenv from "dotenv";
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import { SERVER_PORT } from '../shared/utils/settings';
import routes from './routes';
import { database } from "../shared/database/connection";
import { errorHandlerMiddleware, successHandlerMiddleware } from "./middleware";
import '../shared/utils/container';

const app = express();
const PORT = SERVER_PORT;

app.use(express.json());
app.use(routes);
app.use(errorHandlerMiddleware);
app.use(successHandlerMiddleware);
app.listen(PORT, async () => {
    try {
        await database.sync();
    } catch (error) {
        console.log(error);
    }
});

export default app;