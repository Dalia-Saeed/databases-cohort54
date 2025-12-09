const mysql = require("mysql2/promise");

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bankdb",
  });

  try {
    await conn.beginTransaction();

    // debit sender
    await conn.execute(`
      UPDATE account SET balance = balance - 1000 WHERE account_number = 101
    `);

    // credit receiver
    await conn.execute(`
      UPDATE account SET balance = balance + 1000 WHERE account_number = 102
    `);

    // log changes
    await conn.execute(
      `INSERT INTO account_changes (account_number, amount, remark)
       VALUES (101, -1000, 'Money transferred to 102'),
              (102, 1000, 'Money received from 101')`
    );

    await conn.commit();
    console.log("Transaction completed.");
  } catch (err) {
    await conn.rollback();
    console.error("Transaction rolled back:", err);
  }

  conn.end();
}

main();
