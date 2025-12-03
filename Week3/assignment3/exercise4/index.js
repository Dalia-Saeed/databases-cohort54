require("dotenv").config();
const { MongoClient } = require("mongodb");
const seedDatabase = require("./seedDatabase");

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION;

async function main() {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  const episodes = db.collection(collectionName);

  await seedDatabase(db);

  console.log("All episodes:");
  console.log(await episodes.find().toArray());

  // CREATE
  await episodes.insertOne({ title: "New Painting", elements: ["tree", "lake"] });

  // READ
  const ep = await episodes.findOne({ title: "New Painting" });
  console.log("Created:", ep);

  // UPDATE
  await episodes.updateOne(
    { title: "New Painting" },
    { $set: { elements: ["tree", "cloud"] } }
  );

  // DELETE
  await episodes.deleteOne({ title: "New Painting" });

  client.close();
}

main();
