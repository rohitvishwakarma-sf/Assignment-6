export enum Role {
  superAdmin = "superAdmin",
  admin = "admin",
  subscriber = "subscriber",
}

export class User {
  firstName: string;
  middleName?: string;
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
}
