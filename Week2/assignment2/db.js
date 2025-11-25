import pkg from "pg";
const { Client } = pkg;

export const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "YOUR_PASSWORD",
    port: 5432
});
