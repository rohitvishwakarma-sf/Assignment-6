import express, { json } from "express";
import cors from "cors";
// import data from "../../database/data.json";
import * as fs from "fs";
import path from "path/posix";
import { User } from "./User";

var corsOptions = {
  // origin: "http://192.168.29.216:8080",
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  const data = fs.readFileSync("../database/data.json", {
    encoding: "utf8",
  });

  res.setHeader("Content-Type", "application/json");
  res.send(data);
});

app.post("/save", (req, res) => {
  //reading JSON file synchronously
  const data = fs.readFileSync("../database/data.json", {
    encoding: "utf8",
  });
  //changing data in obj array
  const editedUser = req.body as User;
  const users = JSON.parse(data) as User[];
  users.forEach((value, index) => {
    if (value.email === editedUser.email) {
      users[index] = editedUser;
    }
  });
  const newJson = JSON.stringify(users);
  //writing JSON data
  fs.writeFileSync("../database/data.json", newJson);

  res.status(200).send();
});

app.delete("/");

app.listen(5000, () => console.log("server running"));
