import express, { json, response } from "express";
import cors from "cors";
import { queries } from "./queries";

// creating Cors option to follow CorsPolicy
let corsOptions = {
  // origin: "http://192.168.29.216:8080",
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express(); // instantiating express object
app.use(express.json());
app.use(cors(corsOptions)); // using cors option

// get all users
app.get("/", queries.getAllUsers);

// update users
app.post("/save", queries.saveUser);

//delete users
app.delete("/:email", queries.deleteUser);

app.listen(5000, () => console.log("server running"));
