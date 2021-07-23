import { plainToClass } from "class-transformer";
import { Role, User } from "./User";
import { ICrud } from "./interface";
import { ClassConstants as CC } from "./classConstants";
import { myURL } from "./client";
import { autoBind } from "./decorators/decorator";

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
    await fetch(myURL, {})
      .then((res) => {
        return res.json();
      })
      .then((data: string) => {
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

  async renderTable() {
    this.hostEle.innerHTML = "";
    const tableEle = document.createElement("table");
    tableEle.className = "styled-table";
    const thead = document.createElement("thead");
    tableEle.appendChild(thead);
    const headtr = document.createElement("tr");
    thead.appendChild(headtr);
    headtr.innerHTML = `
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Customer Name</th>
                            <th>Actions</th>`;
    this.hostEle.appendChild(tableEle);
    this.tableBody = document.createElement("tbody");
    tableEle.appendChild(this.tableBody);
    // this.users.forEach((value, index) => {
    //   this.addRow(value);
    // });
    for (const user of this.users) {
      await this.addRow(user);
    }
    // const addbutton = document.createElement("button");
    // addbutton.id = "addbutton";
    // addbutton.textContent = "Create Data";
    // addbutton.addEventListener("click", this.onCreateData);
    // this.hostEle.appendChild(addbutton);
  }
  async addRow(user: User) {
    const customerName = await this.getCustomerName(user.user_id!).then(
      (data) => data
    );

    const row = document.createElement("tr");
    row.innerHTML = `   <td>${user.user_id}</td>
                        <td>${user.firstname}</td>
                        <td>${user.middlename} </td>
                        <td>${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.address}</td>
                        <td>${user.role_key}</td>
                        <td>${customerName}</td>`;
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
    console.log(i);

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
    row.children[0].innerHTML = `<input value=${user.user_id} disabled>`;
    row.children[1].innerHTML = `<input value=${user.firstname}>`;
    row.children[2].innerHTML = `<input value=${user.middlename}>`;
    row.children[3].innerHTML = `<input value=${user.lastname}>`;
    row.children[4].innerHTML = `<input value=${user.email}>`;
    row.children[5].innerHTML = `<input value=${user.phone}>`;
    const select = document.createElement("select");
    select.className = "selectrole";
    for (const e in Role) {
      const option = document.createElement("option");
      option.value = e;
      option.textContent = e;
      if (user.role_key === e) option.selected = true;
      else option.selected = false;
      select.appendChild(option);
    }
    row.children[6].innerHTML = `<input value=${user.address}>`;
    row.children[7].firstChild!.replaceWith(select);
  }
  // @autoBind
  // onCreateData(e: Event) {
  //   (<HTMLButtonElement>e.target).style.display = "none";
  //   const row = document.createElement("tr");
  //   row.id = "create-user-row";
  //   row.innerHTML = `<td><input></td>
  //   <td><input></td>
  //   <td><input></td>
  //   <td><input></td>
  //   <td><input></td>
  //   <td><input></td>
  //   <td><select class="selectrole">
  //     <option value="superadmin">superadmin</option>
  //     <option value="admin">admin</option>
  //     <option value="subscriber">subscriber</option>
  //   </select></td>
  //   <td></td>`;
  //   const saveNewUserButton = document.createElement("button");
  //   saveNewUserButton.textContent = "Save";
  //   saveNewUserButton.addEventListener("click", this.saveNewUser);
  //   row.lastChild!.appendChild(saveNewUserButton);
  //   this.tableBody!.appendChild(row);
  // }
  // @autoBind
  // async saveNewUser() {
  //   const row = document.getElementById(
  //     "create-user-row"
  //   ) as HTMLTableRowElement;
  //   const jsonUser = this.getEditedUser(this.tableBody!.childElementCount - 1);
  //   const newuser: User = JSON.parse(jsonUser) as User;
  //   if (
  //     newuser.firstname &&
  //     newuser.lastname &&
  //     newuser.email &&
  //     newuser.phone &&
  //     newuser.address &&
  //     newuser.role_key
  //   ) {
  //     if (!this.users.find((user) => user.email === newuser.email)) {
  //       const resonse = await fetch(myURL, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: jsonUser,
  //       });

  //       if (resonse.status === 204) {
  //         console.log("data added");
  //       }
  //     }
  //     (
  //       document.getElementById("addbutton") as HTMLButtonElement
  //     ).style.display = "";
  //     this.tableBody!.lastChild!.remove();
  //     this.create(newuser);
  //     this.addRow(newuser);
  //   }
  // }
  create(user: User) {
    this.users.push(user);
  }

  edit(user: User) {
    this.editRow(this.users.indexOf(user));
  }
  async delete(user: User) {
    const userIndex = this.users.indexOf(user);
    const response = await fetch(`${myURL}/delete/${user.email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/json",
      },
    });
    if (response.status == 200) {
      this.tableBody!.children[userIndex].remove();
      this.users.splice(userIndex, 1);
    }
  }
  async save(user: User) {
    const index = this.users.indexOf(user);
    try {
      const inputedData = this.getEditedUser(index);

      const response = await fetch(myURL + "/save", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: inputedData,
      });
      if (response.status === 200) {
        const editedUser = JSON.parse(inputedData) as User;
        user.firstname = editedUser.firstname;
        user.middlename = editedUser.middlename;
        user.lastname = editedUser.lastname;
        user.email = editedUser.email;
        user.phone = editedUser.phone;
        user.address = editedUser.address;
        user.role_key = editedUser.role_key;
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
    row.children[0].innerHTML = `${user.user_id}`;
    row.children[1].innerHTML = `${user.firstname}`;
    row.children[2].innerHTML = `${user.middlename}`;
    row.children[3].innerHTML = `${user.lastname}`;
    row.children[4].innerHTML = `${user.email}`;
    row.children[5].innerHTML = `${user.phone}`;
    row.children[6].innerHTML = `${user.address}`;
    row.children[7].innerHTML = `${user.role_key}`;
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
    row.children[0].innerHTML = `${user.user_id}`;
    row.children[1].innerHTML = `${user.firstname}`;
    row.children[2].innerHTML = `${user.middlename}`;
    row.children[3].innerHTML = `${user.lastname}`;
    row.children[4].innerHTML = `${user.email}`;
    row.children[5].innerHTML = `${user.phone}`;
    row.children[6].innerHTML = `${user.address}`;
    row.children[7].innerHTML = `${user.role_key}`;
  }

  refresh() {
    this.users.length = 0;

    this.load();
  }
  getEditedUser(i: number): string {
    const row = this.tableBody!.children[i] as HTMLTableRowElement;
    const user_id = (row.children[0].children[0] as HTMLInputElement).value;
    const firstName = (row.children[1].children[0] as HTMLInputElement).value;
    const middleName = (row.children[2].children[0] as HTMLInputElement).value;
    const lastName = (row.children[3].children[0] as HTMLInputElement).value;
    const email = (row.children[4].children[0] as HTMLInputElement).value;
    const phone = (row.children[5].children[0] as HTMLInputElement).value;
    const address = (row.children[6].children[0] as HTMLInputElement).value;
    const role = (row.children[7].children[0] as HTMLInputElement)
      .value as Role;

    const user = new User(
      firstName,
      middleName,
      lastName,
      email,
      phone,
      role,
      address,
      +user_id
    );
    return JSON.stringify(user);
  }
  async getCustomerName(user_id: number) {
    let customerName: string = "";
    const response = await fetch(`${myURL}/customername/${user_id}`, {})
      .then((response) => response.json())
      .then((data) => {
        const jsonobj = data as { name: string };
        customerName = jsonobj.name;
      });
    return customerName;
  }
}
