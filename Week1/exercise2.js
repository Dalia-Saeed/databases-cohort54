
const { Client } = require("pg");

const dbConfig = {
  user: "hyfuser",
  host: "localhost",
  password: "yourpassword",
  database: "world",
  port: 5432,
};

async function main() {
  const client = new Client(dbConfig);
  await client.connect();

  const queries = [
    {
      question: "Countries with population > 8 million",
      sql: `SELECT name FROM country WHERE population > 8000000;`,
    },
    {
      question: "Countries containing 'land'",
      sql: `SELECT name FROM country WHERE name ILIKE '%land%';`,
    },
    {
      question: "Cities with population 500k–1M",
      sql: `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000;`,
    },
    {
      question: "Countries in Europe",
      sql: `SELECT name FROM country WHERE continent = 'Europe';`,
    },
    {
      question: "Countries by surface area DESC",
      sql: `SELECT name, surfacearea FROM country ORDER BY surfacearea DESC;`,
    },
    {
      question: "Cities in the Netherlands",
      sql: `
        SELECT name
FROM city
WHERE countrycode = 'NLD';

      `,
    },
    {
      question: "Population of Rotterdam",
      sql: `SELECT population FROM city WHERE name = 'Rotterdam';`,
    },
    {
      question: "Top 10 countries by surface area",
      sql: `SELECT name, surfacearea FROM country ORDER BY surfacearea DESC LIMIT 10;`,
    },
    {
      question: "Top 10 most populated cities",
      sql: `SELECT name, population FROM city ORDER BY population DESC LIMIT 10;`,
    },
    {
      question: "World population",
      sql: `SELECT SUM(population) AS world_population FROM country;`,
    },
  ];

  for (const q of queries) {
    console.log(`\n--- ${q.question} ---`);
    const res = await client.query(q.sql);
    console.table(res.rows);
  }

  await client.end();
}

main().catch(console.error);
