
const { MongoClient } = require("mongodb");

async function connectDB() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  const db = client.db("databaseWeek4");
  return { db, client };
}

module.exports = connectDB;
