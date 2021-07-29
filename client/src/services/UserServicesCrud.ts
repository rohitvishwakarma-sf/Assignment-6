import { plainToClass } from "class-transformer";
import { myURL } from "../client";
import { User } from "../model/User";
import { ICrud } from "./interface";

export class UserServicesCrud implements ICrud<User> {
  // reading all users data
  async read(): Promise<User[]> {
    let userArr: User[] = [];
    const res = await fetch(myURL, {});
    const data = await res.json();
    for (const user of data) {
      const newUser = plainToClass(User, user as Object)!;
      userArr.push(newUser);
    }

    return userArr;
  }
  create(obj: User): void {
    throw new Error("Method not implemented.");
  }

  // deleting user
  async delete(obj: User) {
    try {
      const inputedData = JSON.stringify(obj);
      const response = await fetch(myURL + "/" + obj.id, {
        method: "DELETE",
      });
      if (response.status === 200) {
        return "data deleted";
      }
    } catch (error) {
      console.log(error);
    }
  }

  // update user
  async save(obj: User): Promise<any> {
    try {
      const inputedData = JSON.stringify(obj);
      const response = await fetch(myURL + "/save", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: inputedData,
      });
      if (response.status === 200) {
        const user = (await response.json()) as User;
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCustomers(fields: string[]): Promise<any> {
    let params = fields.join("&fields=");
    const res = await fetch(`${myURL}/customers/?fields=${params}`);
    const data = await res.json();
    const customers = data as { name: string; user_id: number }[];
    return customers;
  }
}
