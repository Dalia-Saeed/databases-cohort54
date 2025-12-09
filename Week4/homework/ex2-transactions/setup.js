
const connectDB = require("../db");

async function setup() {
  const { db, client } = await connectDB();
  const accounts = db.collection("accounts");

  await accounts.deleteMany({});

  await accounts.insertMany([
    {
      account_number: 101,
      balance: 5000,
      account_changes: []
    },
    {
      account_number: 102,
      balance: 2000,
      account_changes: []
    },
    {
      account_number: 103,
      balance: 8000,
      account_changes: []
    }
  ]);

  console.log("Setup done: accounts created.");
  await client.close();
}

module.exports = setup;
