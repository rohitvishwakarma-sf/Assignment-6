export enum Role {
  super_admin = "super_admin",
  admin = "admin",
  subscriber = "subscriber",
}
export class User {
  id!: number;
  firstname!: string;
  middlename?: string;
  lastname!: string;
  email!: string;
  phone!: string;
  address!: string;
  role_key!: Role;
  createdon!: string;
  modifiedon!: string;
}
