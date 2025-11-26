import pg from "pg";

export const client = new pg.Client({
    user: "hyfuser",
    host: "localhost",
    database: "hyfuser",
    password: "hyfpassword",
    port: 5432
});
