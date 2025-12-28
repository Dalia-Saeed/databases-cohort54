import 'dotenv/config';
import { MongoClient } from "mongodb";
import seedDatabase from "./seedDatabase.js";


const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection("bob_ross_episodes");

    // Seed database
    await seedDatabase(db);
    console.log("Database seeded");

    // CREATE
    const createResult = await collection.insertOne({
      title: "My Happy Trees",
      elements: ["trees", "mountain", "river"]
    });
    console.log("Inserted document with id:", createResult.insertedId);

    // READ
    const episodesWithTrees = await collection
      .find({ elements: "trees" })
      .toArray();
    console.log("Number of episodes with trees:", episodesWithTrees.length);

    // UPDATE
    const updateResult = await collection.updateOne(
      { title: "My Happy Trees" },
      { $set: { title: "My Even Happier Trees" } }
    );
    console.log("Number of updated documents:", updateResult.modifiedCount);

    // DELETE
    const deleteResult = await collection.deleteOne({
      title: "My Even Happier Trees"
    });
    console.log("Number of deleted documents:", deleteResult.deletedCount);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();
