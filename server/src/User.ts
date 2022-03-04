export enum Role {
  super_admin = "super_admin",
  admin = "admin",
  subscriber = "subscriber",
}
export class User {
  user_id!: number;
  firstname!: string;
  middlename?: string;
  lastname!: string;
  email!: string;
  phone!: string;
  address!: string;
  role_key!: Role;
}
