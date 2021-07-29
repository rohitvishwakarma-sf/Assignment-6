import { Role, User } from "../model/User";
import { UserServicesCrud } from "../services/UserServicesCrud";
import { ClassConstants as CC } from "../model/classConstants";
export class UserController {
  users: User[] = [];
  hostEle: HTMLDivElement;
  tableBody?: HTMLDivElement;
  userServicesCrud: UserServicesCrud;
  customers: Map<number, string>;
  constructor(hostId: string) {
    this.hostEle = document.getElementById(hostId)! as HTMLDivElement;
    this.userServicesCrud = new UserServicesCrud();
    this.customers = new Map();
  }

  async load() {
    this.users = await this.userServicesCrud.read();
    const customerdata: { name: string; user_id: number }[] =
      await this.userServicesCrud.getCustomers(["name", "user_id"]);

    customerdata.forEach((value, index) => {
      this.customers.set(value.user_id, value.name);
    });

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
    headtr.innerHTML = `<th>ID</th>
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
    this.users.map(async (value, index) => {
      await this.addRow(value, index);
    });
  }

  addRow(user: User, index: number) {
    const row = document.createElement("tr");
    row.innerHTML = ` <td>${user.id}</td>
                        <td>${user.firstname}</td>
                        <td>${user.middlename} </td>
                        <td>${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.address}</td>
                        <td>${user.role_key}</td>
                        <td>${this.customers.get(user.id!)}</td>`;
    const actionTd = document.createElement("td");
    row.appendChild(actionTd);
    const editbutton = this.createNewButton("Edit", CC.editbutton);
    const deletebutton = this.createNewButton("Delete", CC.deletebutton);
    const cancelbutton = this.createNewButton("Cancel", CC.cancelbutton);
    const savebutton = this.createNewButton("Save", CC.savebutton);
    cancelbutton.style.display = "none";
    savebutton.style.display = "none";

    editbutton.addEventListener("click", () => {
      this.edit(index);
    });
    savebutton.addEventListener("click", () => {
      this.save(index);
    });
    cancelbutton.addEventListener("click", () => {
      this.cancel(index);
    });
    deletebutton.addEventListener("click", () => {
      this.delete(index);
    });
    actionTd.appendChild(editbutton);
    actionTd.appendChild(deletebutton);
    actionTd.appendChild(savebutton);
    actionTd.appendChild(cancelbutton);

    this.tableBody!.appendChild(row);
  }
  createNewButton(text: string, className: CC): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = text;

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
    row.children[0].innerHTML = `<input value=${user.id} disabled>`;
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

  edit(i: number) {
    const user = this.users[i];
    this.editRow(this.users.indexOf(user));
  }
  async delete(i: number) {
    const user = this.users[i];
    await this.userServicesCrud.delete(user);

    this.tableBody!.children[i].remove();
    this.users.splice(i, 1);
    this.renderTable();
  }

  async save(i: number) {
    const currentUser = this.users[i];
    const inputedJsonUser = this.getEditedUser(i);
    const inputedUser = JSON.parse(inputedJsonUser) as User;
    await this.userServicesCrud.save(inputedUser);

    currentUser.firstname = inputedUser.firstname;
    currentUser.middlename = inputedUser.middlename;
    currentUser.lastname = inputedUser.lastname;
    currentUser.email = inputedUser.email;
    currentUser.phone = inputedUser.phone;
    currentUser.address = inputedUser.address;
    currentUser.role_key = inputedUser.role_key;

    const row = this.tableBody!.children[i] as HTMLTableRowElement;

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
    row.children[0].innerHTML = `${currentUser.id}`;
    row.children[1].innerHTML = `${currentUser.firstname}`;
    row.children[2].innerHTML = `${currentUser.middlename}`;
    row.children[3].innerHTML = `${currentUser.lastname}`;
    row.children[4].innerHTML = `${currentUser.email}`;
    row.children[5].innerHTML = `${currentUser.phone}`;
    row.children[6].innerHTML = `${currentUser.address}`;
    row.children[7].innerHTML = `${currentUser.role_key}`;
  }
  cancel(i: number) {
    const user = this.users[i];
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
    row.children[0].innerHTML = `${user.id}`;
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
    const user_Id = (row.children[0].children[0] as HTMLInputElement).value;
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
      +user_Id
    );
    return JSON.stringify(user);
  }
}
