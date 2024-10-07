import { Sequelize } from "sequelize";
import { DB_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } from "../utils/settings";

export const database = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:5432/${POSTGRES_DB}`
    , { dialectModule: require('pg') }
);