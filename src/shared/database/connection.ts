import { Sequelize } from "sequelize";
import { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } from "../utils/settings";

export const database = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}`,
    { dialectModule: require('pg') }
);
