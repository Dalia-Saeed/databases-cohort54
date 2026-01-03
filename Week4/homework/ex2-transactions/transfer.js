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

async function transferMoney(fromAccount, toAccount, amount, remark) {
  const session = client.startSession();
  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const collection = db.collection("accounts");

    await session.withTransaction(async () => {

      const from = await collection.findOne({ account_number: fromAccount }, { session });
      const to = await collection.findOne({ account_number: toAccount }, { session });

      if (!from || !to) throw new Error("Account not found");
      if (from.balance < amount) throw new Error("Insufficient funds");

      await collection.updateOne(
        { account_number: fromAccount },
        {
          $inc: { balance: -amount },
          $push: {
            account_changes: {
              change_number: from.account_changes.length + 1,
              amount: -amount,
              changed_date: new Date(),
              remark: remark
            }
          }
        },
        { session }
      );

      await collection.updateOne(
        { account_number: toAccount },
        {
          $inc: { balance: amount },
          $push: {
            account_changes: {
              change_number: to.account_changes.length + 1,
              amount: amount,
              changed_date: new Date(),
              remark: remark
            }
          }
        },
        { session }
      );
    });

    console.log(`Transferred ${amount} from ${fromAccount} to ${toAccount}`);
  } catch (err) {
    console.error("Transaction failed:", err.message);
  } finally {
    await session.endSession();
    await client.close();
  }
}

module.exports = { transferMoney };

 
if (require.main === module) {
  transferMoney(101, 102, 1000, "Test transfer");
}
