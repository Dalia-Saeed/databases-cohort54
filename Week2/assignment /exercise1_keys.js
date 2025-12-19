import { client } from "./assignment/db_config.js";

async function run() {
  await client.connect();

  await client.query(`
    CREATE TABLE authors (
      author_id SERIAL PRIMARY KEY,
      author_name VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      university VARCHAR(255),
      h_index INT,
      gender VARCHAR(50),
      mentor INT,
      CONSTRAINT fk_author_mentor
        FOREIGN KEY (mentor)
        REFERENCES authors(author_id)
    );
  `);

  console.log("Exercise 1: authors table created with mentor column.");
  await client.end();
}

run().catch(console.error);
