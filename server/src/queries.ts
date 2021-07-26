import { Request, Response } from "express";
import * as fs from "fs";
import { User } from "./User";
import { pool as db } from "./database";
class Queries {
  getAllUsers(request: Request, response: Response) {
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
  }

  async saveUser(request: Request, response: Response) {
    const user = (await request.body) as User;

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
  }

  deleteUser(request: Request, response: Response) {
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
  }
  createUser(request: Request, response: Response) {
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
  }
}

export const queries = new Queries();
