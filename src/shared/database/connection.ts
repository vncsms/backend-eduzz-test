import { Sequelize } from "sequelize";
import { STAGE } from "../utils/settings";

export const database = new Sequelize({
    dialect: 'sqlite',
    storage: `./database_${STAGE}.sqlite`,
    logging: false
})