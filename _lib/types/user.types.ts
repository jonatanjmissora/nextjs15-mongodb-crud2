import { ObjectId } from "mongodb";

export type UserType = {
  _id: ObjectId;
  username: string;
  userpassword: string;
}