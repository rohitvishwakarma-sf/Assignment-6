import { Request, Response } from "express";
import * as fs from "fs";
import { User } from "./User";
class Queries {
  getAllUsers(req: Request, res: Response) {
    const data = fs.readFileSync("../database/data.json", {
      encoding: "utf8",
    });

    res.setHeader("Content-Type", "application/json");
    res.send(data);
  }

  async saveUser(req: Request, res: Response) {
    const data = fs.readFileSync("../database/data.json", {
      encoding: "utf8",
    });

    //changing data in obj array
    const editedUser = (await req.body) as User;

    const users = JSON.parse(data) as User[];
    const index = users.findIndex((user) => user.email == editedUser.email);
    users[index] = editedUser;
    const newJson = JSON.stringify(users);
    fs.writeFileSync("../database/data.json", newJson);

    res.status(200).send();
  }

  deleteUser(req: Request, res: Response) {
    const data = fs.readFileSync("../database/data.json", {
      encoding: "utf8",
    });
    const users = JSON.parse(data) as User[];
    const index = users.findIndex((u) => u.email == req.params.email);
    users.splice(index, 1);
    const newJson = JSON.stringify(users);
    fs.writeFileSync("../database/data.json", newJson);
    res.status(200).send();
  }
}

export const queries = new Queries();
