// import { User } from "./User";
// import { autoBind } from "./decorators/autobind";
// // import data from "./data.json";
// import { plainToClass } from "class-transformer";
// import { Role } from "./User";
// import { ICrud } from "./ICrud";
// import { myURL } from "./client";

// function DateTimeDecorator(target: Object, propertyKey: string) {}
// export class TableView {
//   users: ICrud[] = [];
//   hostEle: HTMLDivElement;

//   date: string = "";

//   // cellItem:
//   constructor(hostId: string) {
//     this.hostEle = document.getElementById(hostId)! as HTMLDivElement;
//   }

//   loadDataFronJson() {
//     // for (const user of data) {
//     //   const newUser = plainToClass(User, user)!;
//     //   this.users.push(newUser);
//     // }
//   }

//   load(newUsers: ICrud[]) {
//     this.hostEle.innerHTML = "";
//     this.users = newUsers;

//     const tableEle = document.createElement("table");
//     tableEle.className = "styled-table";
//     const thead = document.createElement("thead");
//     tableEle.appendChild(thead);
//     const headtr = document.createElement("tr");
//     thead.appendChild(headtr);
//     headtr.innerHTML = `<th>First Name</th>
//                             <th>Middle Name</th>
//                             <th>Last Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Address</th>
//                             <th>Role</th>
//                             <th>Actions</th>`;
//     this.hostEle.appendChild(tableEle);
//     const tbody = document.createElement("tbody");
//     tableEle.appendChild(tbody);
//     this.users.forEach((value, index) => {
//       value.create(
//         tbody,
//         (event) => {
//           this.edit(event, value);
//         },
//         (event) => {
//           this.delete(event, value);
//         },
//         (event) => {
//           this.save(event, value);
//         },
//         (event) => {
//           this.cancel(event, value);
//         }
//       );
//     });
//   }
//   edit(e: Event, user: ICrud) {
//     user.edit();
//   }
//   delete(e: Event, user: ICrud) {
//     user.delete();
//     this.users.splice(this.users.indexOf(user), 1);
//   }
//   async save(e: Event, user: ICrud) {
//     try {
//       const inputedData = (user as User).getEditedData();
//       const response = await fetch(myURL + "/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: inputedData,
//       });
//       if (response.status === 200) {
//         console.log("data changed");

//         user.save();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   cancel(e: Event, user: ICrud) {
//     user.cancel();
//   }

//   async refresh() {
//     this.users.forEach((value, index) => {
//       value.delete();
//     });
//     this.users = [];
//     await fetch(myURL, {})
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         for (const user of data) {
//           const newUser = plainToClass(User, user as Object)!;
//           this.users.push(newUser);
//         }
//         this.load(this.users);
//       })
//       .catch((err) => console.log(err));
//   }
// }
import { plainToClass } from "class-transformer";
import { Role, User } from "./User";
import { ICrud } from "./interface";
import { ClassConstants as CC } from "./classConstants";
import { myURL } from "./client";

function DateTimeDecorator(target: Object, propertyKey: string) {}
export class UserCrud implements ICrud<User> {
  users: User[];
  hostEle: HTMLDivElement;
  tableBody?: HTMLDivElement;
  date: string = "";

  // cellItem:
  constructor(hostId: string) {
    this.users = [];
    this.hostEle = document.getElementById(hostId)! as HTMLDivElement;
    this.users[0];
  }

  async fetchUsers() {
    // for (const user of data) {
    //   const newUser = plainToClass(User, user)!;
    //   this.users.push(newUser);
    // }
    await fetch(myURL, {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (const user of data) {
          const newUser = plainToClass(User, user as Object)!;
          this.users.push(newUser);
        }
      })
      .catch((err) => console.log(err));
  }

  async load() {
    await this.fetchUsers();
    this.renderTable();
  }

  renderTable() {
    this.hostEle.innerHTML = "";
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
    this.tableBody = document.createElement("tbody");
    tableEle.appendChild(this.tableBody);
    this.users.forEach((value, index) => {
      this.addRow(value);
    });
  }
  addRow(user: User) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.firstName}</td>
                        <td>${user.middleName} </td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.address}</td>
                        <td>${user.role}</td>`;
    const actionTd = document.createElement("td");
    row.appendChild(actionTd);
    const editbutton = this.createNewButton("Edit", CC.editbutton, () => {
      this.edit(user);
    });
    const deletebutton = this.createNewButton("Delete", CC.deletebutton, () => {
      this.delete(user);
    });
    const cancelbutton = this.createNewButton("Cancel", CC.cancelbutton, () => {
      this.cancel(user);
    });
    cancelbutton.style.display = "none";
    const savebutton = this.createNewButton("Save", CC.savebutton, () => {
      this.save(user);
    });
    savebutton.style.display = "none";
    actionTd.appendChild(editbutton);
    actionTd.appendChild(deletebutton);
    actionTd.appendChild(savebutton);
    actionTd.appendChild(cancelbutton);

    this.tableBody!.appendChild(row);
  }
  createNewButton(
    text: string,
    className: CC,
    onClickHandler: EventListenerOrEventListenerObject
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = text;
    button.addEventListener("click", onClickHandler);
    return button;
  }
  editRow(i: number) {
    const row = this.tableBody!.children[i] as HTMLTableRowElement;
    const buttonTd = row.lastChild as HTMLTableDataCellElement;

    (
      buttonTd.querySelector(`.${CC.editbutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      buttonTd.querySelector(`.${CC.deletebutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      buttonTd.querySelector(`.${CC.savebutton}`) as HTMLButtonElement
    ).style.display = "";
    (
      buttonTd.querySelector(`.${CC.cancelbutton}`) as HTMLButtonElement
    ).style.display = "";
    const user = this.users[i];
    row.children[0].innerHTML = `<input value=${user.firstName}>`;
    row.children[1].innerHTML = `<input value=${user.middleName}>`;
    row.children[2].innerHTML = `<input value=${user.lastName}>`;
    row.children[3].innerHTML = `<input value=${user.email}>`;
    row.children[4].innerHTML = `<input value=${user.phone}>`;
    const select = document.createElement("select");
    select.className = "selectrole";
    for (const e in Role) {
      const option = document.createElement("option");
      option.value = e;
      option.textContent = e;
      if (user.role === e) option.selected = true;
      else option.selected = false;
      select.appendChild(option);
    }
    row.children[5].innerHTML = `<input value=${user.address}>`;
    row.children[6].firstChild!.replaceWith(select);
  }
  create(user: User) {
    this.users.push(user);
  }
  edit(user: User) {
    this.editRow(this.users.indexOf(user));
  }
  delete(user: User) {
    const userIndex = this.users.indexOf(user);
    this.tableBody!.children[userIndex].remove();
    this.users.splice(userIndex, 1);
  }
  async save(user: User) {
    const index = this.users.indexOf(user);
    try {
      const inputedData = this.getEditedUser(index);

      const response = await fetch(myURL + "/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: inputedData,
      });
      if (response.status === 200) {
        console.log("data changed");

        const editedUser = JSON.parse(inputedData) as User;
        user.firstName = editedUser.firstName;
        user.middleName = editedUser.middleName;
        user.lastName = editedUser.lastName;
        user.email = editedUser.email;
        user.phone = editedUser.phone;
        user.address = editedUser.address;
        user.role = editedUser.role;
      }
    } catch (error) {
      console.log(error);
    }
    const row = this.tableBody!.children[index] as HTMLTableRowElement;

    const buttonTd = row.lastChild as HTMLTableDataCellElement;

    (
      buttonTd.querySelector(`.${CC.savebutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      buttonTd.querySelector(`.${CC.cancelbutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      buttonTd.querySelector(`.${CC.editbutton}`) as HTMLButtonElement
    ).style.display = "";
    (
      buttonTd.querySelector(`.${CC.deletebutton}`) as HTMLButtonElement
    ).style.display = "";

    // user.firstName = (row.children[0].children[0] as HTMLInputElement).value;
    // user.middleName = (row.children[1].children[0] as HTMLInputElement).value;
    // user.lastName = (row.children[2].children[0] as HTMLInputElement).value;
    // user.email = (row.children[3].children[0] as HTMLInputElement).value;
    // user.phone = (row.children[4].children[0] as HTMLInputElement).value;
    // user.address = (row.children[5].children[0] as HTMLInputElement).value;
    // user.role = (row.children[6].children[0] as HTMLInputElement).value as Role;

    row.children[0].innerHTML = `${user.firstName}`;
    row.children[1].innerHTML = `${user.middleName}`;
    row.children[2].innerHTML = `${user.lastName}`;
    row.children[3].innerHTML = `${user.email}`;
    row.children[4].innerHTML = `${user.phone}`;
    row.children[5].innerHTML = `${user.address}`;
    row.children[6].innerHTML = `${user.role}`;
  }
  cancel(user: User) {
    const row = this.tableBody!.children[
      this.users.indexOf(user)
    ] as HTMLTableRowElement;
    const actionTd = row.lastElementChild!;
    (
      actionTd.querySelector(`.${CC.cancelbutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      actionTd.querySelector(`.${CC.savebutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      actionTd.querySelector(`.${CC.editbutton}`) as HTMLButtonElement
    ).style.display = "";
    (
      actionTd.querySelector(`.${CC.deletebutton}`) as HTMLButtonElement
    ).style.display = "";

    row.children[0].innerHTML = `${user.firstName}`;
    row.children[1].innerHTML = `${user.middleName}`;
    row.children[2].innerHTML = `${user.lastName}`;
    row.children[3].innerHTML = `${user.email}`;
    row.children[4].innerHTML = `${user.phone}`;
    row.children[5].innerHTML = `${user.address}`;
    row.children[6].innerHTML = `${user.role}`;
  }

  refresh() {
    this.users.length = 0;

    this.load();
  }
  getEditedUser(i: number): string {
    const row = this.tableBody!.children[i] as HTMLTableRowElement;
    const firstName = (row.children[0].children[0] as HTMLInputElement).value;
    const middleName = (row.children[1].children[0] as HTMLInputElement).value;
    const lastName = (row.children[2].children[0] as HTMLInputElement).value;
    const email = (row.children[3].children[0] as HTMLInputElement).value;
    const phone = (row.children[4].children[0] as HTMLInputElement).value;
    const address = (row.children[5].children[0] as HTMLInputElement).value;
    const role = (row.children[6].children[0] as HTMLInputElement)
      .value as Role;

    const user = new User(
      firstName,
      middleName,
      lastName,
      email,
      phone,
      role,
      address
    );
    return JSON.stringify(user);
  }
}
