
async function getPopulationByCountryPerYear(db, countryName) {
  return await db.collection("population").aggregate([
    { $match: { Country: countryName } },
    {
      $group: {
        _id: "$Year",
        countPopulation: { $sum: { $add: ["$M", "$F"] } }
      }
    },
    { $sort: { _id: 1 } }
  ]).toArray();
}

async function getContinentPopulationByYearAndAge(db, year, age) {
  return await db.collection("population").aggregate([
    { $match: { Year: year, Age: age } },
    {
      $addFields: {
        TotalPopulation: { $add: ["$M", "$F"] }
      }
    }
  ]).toArray();
}

module.exports = {
  getPopulationByCountryPerYear,
  getContinentPopulationByYearAndAge
};
