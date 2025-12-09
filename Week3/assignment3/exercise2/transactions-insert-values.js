const mysql = require("mysql2/promise");

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bankdb",
  });

  await conn.execute(
    `INSERT INTO account (account_number, balance)
     VALUES (101, 5000), (102, 2000)`
  );

  console.log("Sample data inserted.");
  conn.end();
}

main();
