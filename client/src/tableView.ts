import { User } from "./User";
import { autoBind } from "./decorators/autobind";
// import data from "./data.json";
import { plainToClass } from "class-transformer";
import { Role } from "./User";
import { ICrud } from "./ICrud";
import { myURL } from "./client";

function DateTimeDecorator(target: Object, propertyKey: string) {}
export class TableView {
  users: ICrud[] = [];
  hostEle: HTMLDivElement;

  date: string = "";

  // cellItem:
  constructor(hostId: string) {
    this.hostEle = document.getElementById(hostId)! as HTMLDivElement;
  }

  loadDataFronJson() {
    // for (const user of data) {
    //   const newUser = plainToClass(User, user)!;
    //   this.users.push(newUser);
    // }
  }

  load(newUsers: ICrud[]) {
    this.hostEle.innerHTML = "";
    this.users = newUsers;

    const tableEle = document.createElement("table");
    tableEle.className = "styled-table";
    const thead = document.createElement("thead");
    tableEle.appendChild(thead);
    const headtr = document.createElement("tr");
    thead.appendChild(headtr);
    headtr.innerHTML = `<th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Actions</th>`;
    this.hostEle.appendChild(tableEle);
    const tbody = document.createElement("tbody");
    tableEle.appendChild(tbody);
    this.users.forEach((value, index) => {
      value.create(
        tbody,
        (event) => {
          this.edit(event, value);
        },
        (event) => {
          this.delete(event, value);
        },
        (event) => {
          this.save(event, value);
        },
        (event) => {
          this.cancel(event, value);
        }
      );
    });
  }
  edit(e: Event, user: ICrud) {
    user.edit();
  }
  delete(e: Event, user: ICrud) {
    user.delete();
    this.users.splice(this.users.indexOf(user), 1);
  }
  async save(e: Event, user: ICrud) {
    try {
      const inputedData = (user as User).getEditedData();
      const response = await fetch(myURL + "/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: inputedData,
      });
      if (response.status === 200) {
        console.log("data changed");

        user.save();
      }
    } catch (error) {
      console.log(error);
    }
  }
  cancel(e: Event, user: ICrud) {
    user.cancel();
  }

  async refresh() {
    this.users.forEach((value, index) => {
      value.delete();
    });
    this.users = [];
    await fetch(myURL, {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (const user of data) {
          const newUser = plainToClass(User, user as Object)!;
          this.users.push(newUser);
        }
        this.load(this.users);
      })
      .catch((err) => console.log(err));
  }
}
