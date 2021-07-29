import express, { json, response } from "express";
import cors from "cors";
// import data from "../../database/data.json";
import * as fs from "fs";
import path from "path/posix";
import { User } from "./User";
import { pool as db } from "./database";
import { queries } from "./queries";
var corsOptions = {
  // origin: "http://192.168.29.216:8080",
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", queries.getAllUsers);

app.patch("/save", queries.saveUser);

app.delete("/:userId", queries.deleteUser);

app.put("/", queries.createUser);
app.get("/customers/", queries.getCustomerName);

app.listen(5000, () => console.log("server running at http://localhost:5000"));
