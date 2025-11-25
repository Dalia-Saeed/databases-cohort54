import { client } from "./db_config.js";

async function run() {
    await client.connect();

    await client.query(`
        CREATE TABLE IF NOT EXISTS authors (
            author_id SERIAL PRIMARY KEY,
            author_name VARCHAR(255) NOT NULL,
            university VARCHAR(255),
            date_of_birth DATE,
            h_index INT,
            gender VARCHAR(50)
        );
    `);

    await client.query(`
        ALTER TABLE authors
        ADD COLUMN IF NOT EXISTS mentor INT;
    `);

    await client.query(`
        ALTER TABLE authors
        ADD CONSTRAINT IF NOT EXISTS fk_author_mentor
        FOREIGN KEY (mentor)
        REFERENCES authors(author_id);
    `);

    console.log("Exercise 1: authors table created with mentor column.");
    await client.end();
}

run().catch(console.error);