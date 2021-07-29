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
  createdon: string;
  modifiedon: string;

  constructor(
    firstName: string,
    middleName: string = "",
    lastName: string,
    email: string,
    phone: string,
    role: Role,
    address: string,
    createdon: string,
    modifiedon: string,
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
      this.createdon = createdon;
      this.modifiedon = modifiedon;
      this.id = user_id;
    }
  }
}
