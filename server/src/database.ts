import { Client } from "pg";

export const dbClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "sfassignmentdb",
  password: "root",
  port: 5432,
});
