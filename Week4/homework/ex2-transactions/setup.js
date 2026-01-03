const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function setupAccounts() {
  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("accounts");

    await collection.deleteMany({});

    const accounts = [
      { account_number: 101, balance: 5000, account_changes: [] },
      { account_number: 102, balance: 3000, account_changes: [] }
    ];

    await collection.insertMany(accounts);
    console.log("Accounts setup completed!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

module.exports = { setupAccounts };

if (require.main === module) {
  setupAccounts();
}
