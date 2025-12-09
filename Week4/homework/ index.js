

const connectDB = require("./db");

const {
  getPopulationByCountryPerYear,
  getContinentPopulationByYearAndAge
} = require("./ex1-aggregation/queries");

const setup = require("./ex2-transactions/setup");
const transfer = require("./ex2-transactions/transfer");

async function main() {
  console.log("Running Setup...");
  await setup();

  console.log("\nRunning Transfer Transaction...");
  await transfer(101, 102, 1000, "Test transfer");

  console.log("\n=== Accounts After Transfer ===");
  const { db, client } = await connectDB();
  const accounts = await db.collection("accounts").find().toArray();
  console.log(accounts);
  await client.close();

  console.log("\nRunning Aggregation Queries...");
  const { db: db2, client: client2 } = await connectDB();

  const agg1 = await getPopulationByCountryPerYear(db2, "Netherlands");
  console.log("\nPopulation by Year for Netherlands:");
  console.log(agg1);

  const agg2 = await getContinentPopulationByYearAndAge(db2, 2020, "100+");
  console.log("\nContinents Data for age 100+ in 2020:");
  console.log(agg2);

  await client2.close();
}

main();
