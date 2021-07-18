import { autoBind } from "./decorators/autobind";
import { ICrud } from "./ICrud";
import { ClassConstants as CC } from "./classConstants";

export enum Role {
  superAdmin = "superAdmin",
  admin = "admin",
  subscriber = "subscriber",
}
// export interface User{

// }
export class User implements ICrud {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: Role;
  row?: HTMLTableRowElement;

  constructor(
    firstName: string,
    middleName: string = "",
    lastName: string,
    email: string,
    phone: string,
    role: Role,
    address: string
  ) {
    //intializing properties
    {
      this.firstName = firstName;
      this.middleName = middleName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
      this.role = role;
      this.address = address;
    }
  }
  create(
    hostEle: HTMLElement,
    editHandler: EventListenerOrEventListenerObject,
    deleteHandler: EventListenerOrEventListenerObject,
    saveHandler: EventListenerOrEventListenerObject,
    cancelHandler: EventListenerOrEventListenerObject
  ): void {
    this.row = document.createElement("tr");
    this.row!.innerHTML = `<td>${this.firstName}</td>
                        <td>${this.middleName} </td>
                        <td>${this.lastName}</td>
                        <td>${this.email}</td>
                        <td>${this.phone}</td>
                        <td>${this.address}</td>
                        <td>${this.role}</td>`;
    const actiontd = document.createElement("td");
    this.row!.appendChild(actiontd);
    const editbutton = this.createNewButton("Edit", CC.editbutton, editHandler);
    const deletebutton = this.createNewButton(
      "Delete",
      CC.deletebutton,
      deleteHandler
    );
    const cancelbutton = this.createNewButton(
      "Cancel",
      CC.cancelbutton,
      this.cancel
    );
    cancelbutton.style.display = "none";
    const savebutton = this.createNewButton("Save", CC.savebutton, saveHandler);
    savebutton.style.display = "none";
    actiontd.appendChild(editbutton);
    actiontd.appendChild(deletebutton);
    actiontd.appendChild(savebutton);
    actiontd.appendChild(cancelbutton);

    hostEle.appendChild(this.row!);
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
  @autoBind
  delete(): void {
    this.row!.remove();
  }
  @autoBind
  edit() {
    const targetParent = this.row!.lastChild as HTMLTableDataCellElement;
    (
      targetParent.querySelector(`.${CC.editbutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      targetParent.querySelector(`.${CC.deletebutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      targetParent.querySelector(`.${CC.savebutton}`) as HTMLButtonElement
    ).style.display = "";
    (
      targetParent.querySelector(`.${CC.cancelbutton}`) as HTMLButtonElement
    ).style.display = "";

    this.editRow();
  }
  editRow() {
    this.row!.children[0].innerHTML = `<input value=${this.firstName}>`;
    this.row!.children[1].innerHTML = `<input value=${this.middleName}>`;
    this.row!.children[2].innerHTML = `<input value=${this.lastName}>`;
    this.row!.children[3].innerHTML = `<input value=${this.email} disabled>`;
    this.row!.children[4].innerHTML = `<input value=${this.phone}>`;
    const select = document.createElement("select");
    select.className = "selectrole";
    for (const e in Role) {
      const option = document.createElement("option");
      option.value = e;
      option.textContent = e;
      if (this.role === e) option.selected = true;
      else option.selected = false;
      select.appendChild(option);
    }
    this.row!.children[5].innerHTML = `<input value=${this.address}>`;
    this.row!.children[6].firstChild!.replaceWith(select);
  }

  @autoBind
  save() {
    const targetParent = this.row!.lastChild as HTMLTableDataCellElement;

    (
      targetParent.querySelector(`.${CC.savebutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      targetParent.querySelector(`.${CC.cancelbutton}`) as HTMLButtonElement
    ).style.display = "none";
    (
      targetParent.querySelector(`.${CC.editbutton}`) as HTMLButtonElement
    ).style.display = "";
    (
      targetParent.querySelector(`.${CC.deletebutton}`) as HTMLButtonElement
    ).style.display = "";

    const tr = targetParent.parentElement as HTMLTableRowElement;
    this.firstName = (tr.children[0].children[0] as HTMLInputElement).value;
    this.middleName = (tr.children[1].children[0] as HTMLInputElement).value;
    this.lastName = (tr.children[2].children[0] as HTMLInputElement).value;
    this.email = (tr.children[3].children[0] as HTMLInputElement).value;
    this.phone = (tr.children[4].children[0] as HTMLInputElement).value;
    this.address = (tr.children[5].children[0] as HTMLInputElement).value;
    this.role = (tr.children[6].children[0] as HTMLInputElement).value as Role;

    tr.children[0].innerHTML = `${this.firstName}`;
    tr.children[1].innerHTML = `${this.middleName}`;
    tr.children[2].innerHTML = `${this.lastName}`;
    tr.children[3].innerHTML = `${this.email}`;
    tr.children[4].innerHTML = `${this.phone}`;
    tr.children[5].innerHTML = `${this.address}`;
    tr.children[6].innerHTML = `${this.role}`;
  }

  @autoBind
  cancel() {
    const actionTd = this.row!.lastElementChild!;
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

    this.row!.children[0].innerHTML = `${this.firstName}`;
    this.row!.children[1].innerHTML = `${this.middleName}`;
    this.row!.children[2].innerHTML = `${this.lastName}`;
    this.row!.children[3].innerHTML = `${this.email}`;
    this.row!.children[4].innerHTML = `${this.phone}`;
    this.row!.children[5].innerHTML = `${this.address}`;
    this.row!.children[6].innerHTML = `${this.role}`;
  }
  getEditedData(): string {
    const obj = {
      firstName: (this.row!.children[0].children[0] as HTMLInputElement).value,
      middleName: (this.row!.children[1].children[0] as HTMLInputElement).value,
      lastName: (this.row!.children[2].children[0] as HTMLInputElement).value,
      email: (this.row!.children[3].children[0] as HTMLInputElement).value,
      phone: (this.row!.children[4].children[0] as HTMLInputElement).value,
      address: (this.row!.children[5].children[0] as HTMLInputElement).value,
      role: (this.row!.children[6].children[0] as HTMLInputElement)
        .value as Role,
    };
    return JSON.stringify(obj);
  }
}
