
import { client } from "./db_config.js";

async function run() {
    await client.connect();

    console.log("Authors and their mentors:");
    let result = await client.query(`
        SELECT a.author_name AS author,
               m.author_name AS mentor
        FROM authors a
        LEFT JOIN authors m ON a.mentor = m.author_id;
    `);
    console.table(result.rows);

    console.log("Authors and their research papers:");
    result = await client.query(`
        SELECT a.author_name, rp.paper_title
        FROM authors a
        LEFT JOIN author_papers ap ON a.author_id = ap.author_id
        LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id;
    `);
    console.table(result.rows);

    await client.end();
}

run().catch(console.error);
