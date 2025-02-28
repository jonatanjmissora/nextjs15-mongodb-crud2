import { ObjectId } from "mongodb";

export type UserType = {
  _id: ObjectId;
  username: string;
  userpassword: string;
}

export type TokenType = {
  username: string;
  _id: string;
  exp: number;
  iat: number;
}