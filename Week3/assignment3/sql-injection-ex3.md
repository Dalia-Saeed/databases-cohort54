1. An example that fetches ALL records
name = "' OR '1'='1"
code = "' OR '1'='1"
This creates:
SELECT Population FROM Country
WHERE Name = '' OR '1'='1' AND code = '' OR '1'='1';


2. Rewrite function to prevent SQL injection
 Use parameterized queries
function getPopulation(Country, name, code, cb) {
  const sql = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;

  conn.query(sql, [Country, name, code], function (err, result) {
    if (err) return cb(err);
    if (result.length === 0) return cb(new Error("Not found"));
    cb(null, result[0].Population);
  });
}