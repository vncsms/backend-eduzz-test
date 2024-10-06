import { Sequelize } from "sequelize";

export const database = new Sequelize('postgres://docker:docker@localhost:5432/polls');
