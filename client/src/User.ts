export enum Role {
  superadmin = "superadmin",
  admin = "admin",
  subscriber = "subscriber",
}

export class User {
  firstname!: string;
  middlename?: string;
  lastname!: string;
  email!: string;
  phone!: string;
  address!: string;
  role!: Role;

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
      this.firstname = firstName;
      this.middlename = middleName;
      this.lastname = lastName;
      this.email = email;
      this.phone = phone;
      this.role = role;
      this.address = address;
    }
  }
}
