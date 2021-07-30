export enum Role {
  super_admin = "super_admin",
  admin = "admin",
  subscriber = "subscriber",
}

export class User {
  id?: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  role_key: Role;

  row?: HTMLTableRowElement;

  constructor(
    firstName: string,
    middleName: string = "",
    lastName: string,
    email: string,
    phone: string,
    role: Role,
    address: string,
    user_id: number
  ) {
    //intializing properties
    {
      this.firstname = firstName;
      this.middlename = middleName;
      this.lastname = lastName;
      this.email = email;
      this.phone = phone;
      this.role_key = role;
      this.address = address;
      this.id = user_id;

    }
  }
}
