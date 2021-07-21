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
}
