import { Sequelize } from "@sequelize/core";

const {
    DB_USER,
    DB_NAME,
    DB_HOST,
    DB_PASS,
    DB_PORT,
} = process.env;
const connectionsURL = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const sequelize = new Sequelize(connectionsURL);
