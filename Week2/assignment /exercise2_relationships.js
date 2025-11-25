
import { client } from "./db_config.js";

async function run() {
    await client.connect();

    await client.query(`
        CREATE TABLE IF NOT EXISTS research_papers (
            paper_id SERIAL PRIMARY KEY,
            paper_title VARCHAR(255) NOT NULL,
            conference VARCHAR(255),
            publish_date DATE
        );
    `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS author_papers (
            author_id INT REFERENCES authors(author_id),
            paper_id INT REFERENCES research_papers(paper_id),
            PRIMARY KEY (author_id, paper_id)
        );
    `);

    console.log("Exercise 2: research_papers and author_papers tables created.");
    await client.end();
}

run().catch(console.error);
