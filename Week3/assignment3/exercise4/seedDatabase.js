import data from "./data.json" assert { type: "json" };

export default async function seedDatabase(db) {
  const collection = db.collection(process.env.COLLECTION);

  await collection.deleteMany({});
  await collection.insertMany(
    data.map((ep, idx) => ({
      episode: idx + 1,
      title: ep.title,
      elements: ep.elements
    }))
  );

  console.log("Database seeded.");
}
