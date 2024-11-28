import { ObjectId } from "mongodb";

export type NoteType = {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
  pinned: boolean;
}

export type NoteFixType = {
  _id: string;
  title: string;
  content: string;
  author: string;
  pinned: boolean;
}