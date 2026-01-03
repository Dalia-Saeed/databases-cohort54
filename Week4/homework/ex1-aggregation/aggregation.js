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

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    const db = client.db("databaseWeek4");
    const collection = db.collection("population"); 
    // =====================
    // 1️⃣ Get population per country (example: Netherlands)
    // =====================
    const populationNetherlands = await getPopulationPerCountry(
      collection,
      "Netherlands"
    );
    console.log("\nPopulation per year for Netherlands:");
    console.table(populationNetherlands);

    // =====================
    // 2️ Get population per continent for year & age
    // =====================
    const continentInfo2020 = await getContinentInfo(collection, 2020, "100+");
    console.log("\nPopulation for continents in 2020 (age 100+):");
    console.table(continentInfo2020);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}
run();

// =====================
// D1: Total population per country
// =====================
const getPopulationPerCountry = async (collection, country) => {
  const pipeline = [
    { $match: { Country: country } }, 
    {
      $group: {
        _id: "$Year",
        countPopulation: { $sum: { $add: ["$M", "$F"] } },
      },
    },
    {
      $project: {
        _id: 0,
        Year: "$_id",
        countPopulation: 1,
      },
    },
    { $sort: { Year: 1 } }, 
  ];

  return await collection.aggregate(pipeline).toArray();
};

// D2: Total population per continent/year/age

const getContinentInfo = async (collection, year, age) => {
  const pipeline = [
    {
      $match: {
        Country: {
          $in: [
            "AFRICA",
            "ASIA",
            "EUROPE",
            "LATIN AMERICA AND THE CARIBBEAN",
            "NORTHERN AMERICA",
            "OCEANIA",
          ],
        },
        Year: year,
        Age: age,
      },
    },
    {
      $addFields: {
        TotalPopulation: { $add: ["$M", "$F"] }, 
      },
    },
    {
      $project: {
        _id: 0,
        Country: 1,
        Year: 1,
        Age: 1,
        M: 1,
        F: 1,
        TotalPopulation: 1,
      },
    },
  ];

  return await collection.aggregate(pipeline).toArray();
};
