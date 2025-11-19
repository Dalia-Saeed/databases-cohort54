
const { Client } = require("pg");

// ---------- CONFIGURE YOUR LOGIN HERE ----------
const superUserConfig = {
  user: "hyfuser",
  host: "localhost",
  password: "yourpassword",
  port: 5432,
};

const meetupDbConfig = {
  ...superUserConfig,
  database: "meetup",
};
// ------------------------------------------------

async function recreateDatabase() {
  const client = new Client(superUserConfig);
  await client.connect();

  console.log("Dropping and creating meetup database...");

  await client.query("DROP DATABASE IF EXISTS meetup;");
  await client.query("CREATE DATABASE meetup;");

  await client.end();
  console.log("Database created!");
}

async function createTablesAndInsertData() {
  const client = new Client(meetupDbConfig);
  await client.connect();

  console.log("Creating tables...");

  await client.query(`
    CREATE TABLE IF NOT EXISTS Invitee (
      invitee_no SERIAL PRIMARY KEY,
      invitee_name VARCHAR(100),
      invited_by VARCHAR(100)
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Room (
      room_no SERIAL PRIMARY KEY,
      room_name VARCHAR(100),
      floor_number INT
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no SERIAL PRIMARY KEY,
      meeting_title VARCHAR(200),
      starting_time TIMESTAMP,
      ending_time TIMESTAMP,
      room_no INT REFERENCES Room(room_no)
    );
  `);

  console.log("Inserting rows...");

  await client.query("DELETE FROM Meeting;");
  await client.query("DELETE FROM Invitee;");
  await client.query("DELETE FROM Room;");

  await client.query(`
    INSERT INTO Invitee (invitee_name, invited_by)
    VALUES 
      ('Alice', 'Bob'),
      ('Charlie', 'Alice'),
      ('Diana', 'Eve'),
      ('Frank', 'Alice'),
      ('George', 'Bob');
  `);

  await client.query(`
    INSERT INTO Room (room_name, floor_number)
    VALUES 
      ('Blue Room', 1),
      ('Green Room', 2),
      ('Yellow Room', 3),
      ('Red Room', 1),
      ('Orange Room', 2);
  `);

  await client.query(`
    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES 
      ('Tech Meetup', '2025-01-01 10:00', '2025-01-01 12:00', 1),
      ('Marketing Sync', '2025-01-02 09:00', '2025-01-02 11:00', 2),
      ('Planning Meeting', '2025-01-03 14:00', '2025-01-03 15:00', 3),
      ('Weekly Standup', '2025-01-04 09:30', '2025-01-04 10:00', 1),
      ('Board Meeting', '2025-01-05 16:00', '2025-01-05 17:00', 4);
  `);

  console.log("Done!");

  await client.end();
}

async function main() {
  await recreateDatabase();
  await createTablesAndInsertData();
  console.log("All operations completed.");
}

main().catch(console.error);
