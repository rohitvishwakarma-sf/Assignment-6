// import { Client } from "pg";

// export const dbClient = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "sfassignmentdb",
//   password: "root",
//   port: 5432,
// });

import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sfassignmentdb",
  password: "root",
  port: 5432,
});

pool.on("error", (err, client) => {
  console.error("Error", err);
});
