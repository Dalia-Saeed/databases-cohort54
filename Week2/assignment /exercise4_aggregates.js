
import { client } from "./db_config.js";

async function run() {
    await client.connect();

    console.log("Number of authors per paper:");
    let result = await client.query(`
        SELECT rp.paper_title, COUNT(ap.author_id) AS num_authors
        FROM research_papers rp
        LEFT JOIN author_papers ap ON rp.paper_id = ap.paper_id
        GROUP BY rp.paper_id;
    `);
    console.table(result.rows);

    console.log("Total papers by female authors:");
    result = await client.query(`
        SELECT SUM(paper_count) AS total_female_papers
        FROM (
            SELECT a.author_id, COUNT(ap.paper_id) AS paper_count
            FROM authors a
            LEFT JOIN author_papers ap ON a.author_id = ap.author_id
            WHERE a.gender = 'female'
            GROUP BY a.author_id
        ) sub;
    `);
    console.table(result.rows);

    console.log("Average h-index per university:");
    result = await client.query(`
        SELECT university, AVG(h_index) AS avg_h_index
        FROM authors
        GROUP BY university;
    `);
    console.table(result.rows);

    console.log("Total papers per university:");
    result = await client.query(`
        SELECT a.university, COUNT(ap.paper_id) AS total_papers
        FROM authors a
        LEFT JOIN author_papers ap ON a.author_id = ap.author_id
        GROUP BY a.university;
    `);
    console.table(result.rows);

    console.log("Min/Max h-index per university:");
    result = await client.query(`
        SELECT university,
               MIN(h_index) AS min_h_index,
               MAX(h_index) AS max_h_index
        FROM authors
        GROUP BY university;
    `);
    console.table(result.rows);

    await client.end();
}

run().catch(console.error);
