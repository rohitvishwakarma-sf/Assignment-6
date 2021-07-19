export enum Role {
  superAdmin = "superAdmin",
  admin = "admin",
  subscriber = "subscriber",
}
export class User {
  firstName!: string;
  middleName?: string;
  lastName!: string;
  email!: string;
  phone!: string;
  address!: string;
  role!: Role;
}
