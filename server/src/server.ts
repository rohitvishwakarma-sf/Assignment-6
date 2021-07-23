import express, { json, response } from "express";
import cors from "cors";
// import data from "../../database/data.json";
import * as fs from "fs";
import path from "path/posix";
import { User } from "./User";
import { pool as db } from "./database";
var corsOptions = {
  // origin: "http://192.168.29.216:8080",
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", async (request, response) => {
  const data = fs.readFileSync("../database/data.json", {
    encoding: "utf8",
  });
  db.connect((err, client, done) => {
    if (err) throw err;
    client.query(`select * from users`, (err, result) => {
      if (err) {
        console.log(err.stack);
      } else {
        // console.log(JSON.stringify(result.rows));
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(result.rows));
        // res.send(result.rows);
      }
    });
  });
});

app.patch("/save", (request, response) => {
  const user = request.body as User;
  console.log(user);

  db.connect((err, client, done) => {
    client.query(
      `update users
                  set firstname = '${user.firstname}',
                   middlename = '${user.middlename}',
                   lastname = '${user.lastname}',
                   phone = '${user.phone}',
                   address = '${user.address}',
                   role_key = '${user.role_key}',
                   email = '${user.email}'
                  where user_id = '${user.user_id}';
                  `,
      (err, res) => {
        if (err) {
          console.log(err);
          response.status(417).send(err.message);
        } else {
          response.status(200).send();
        }
      }
    );
  });
});

app.delete("/delete/:email", (request, response) => {
  console.log(request.params);
  db.connect((err, client, done) => {
    client.query(
      `delete from users where email = '${request.params.email}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          response.status(417).send(err.message);
        } else {
          response.status(200).send();
        }
      }
    );
  });
});

app.put("/", (request, response) => {
  const user = request.body as User;
  db.connect((err, client, done) => {
    client.query(
      `insert into users values ('${user.firstname}','${user.middlename}','${user.lastname}','${user.email}','${user.phone}','${user.address}','${user.role_key}');`,
      (err, result) => {
        if (err) {
          console.log(err);
          response.status(417).send(err);
        } else {
          response.status(204).send();
        }
      }
    );
  });
});

app.listen(5000, () => console.log("server running at http://localhost:5000"));
