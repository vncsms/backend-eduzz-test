import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { SERVER_PORT } from '../shared/utils/settings';
import routes from './route';

const app = express();
const PORT = SERVER_PORT;

app.use(express.json());
app.use(routes);
app.listen(PORT, async () => {
    try {
        // database sync;
    } catch (error) {
        console.log(error);
    }
});

export default app;