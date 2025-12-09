
const connectDB = require("../db");

async function transfer(fromAcc, toAcc, amount, remark) {
  const { db, client } = await connectDB();
  const accounts = db.collection("accounts");

  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const from = await accounts.findOne({ account_number: fromAcc }, { session });
      const to = await accounts.findOne({ account_number: toAcc }, { session });

      if (!from || !to) throw new Error("Account not found.");
      if (from.balance < amount) throw new Error("Insufficient funds.");

      const nextChangeFrom =
        (from.account_changes.at(-1)?.change_number || 0) + 1;

      const nextChangeTo =
        (to.account_changes.at(-1)?.change_number || 0) + 1;

      await accounts.updateOne(
        { account_number: fromAcc },
        {
          $inc: { balance: -amount },
          $push: {
            account_changes: {
              change_number: nextChangeFrom,
              amount: -amount,
              changed_date: new Date(),
              remark
            }
          }
        },
        { session }
      );

      await accounts.updateOne(
        { account_number: toAcc },
        {
          $inc: { balance: amount },
          $push: {
            account_changes: {
              change_number: nextChangeTo,
              amount: amount,
              changed_date: new Date(),
              remark
            }
          }
        },
        { session }
      );
    });

    console.log(`Transfer of ${amount} from ${fromAcc} to ${toAcc} completed.`);
  } catch (err) {
    console.log("Transaction failed:", err.message);
  } finally {
    await session.endSession();
    await client.close();
  }
}

module.exports = transfer;
