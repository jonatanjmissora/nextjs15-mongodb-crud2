"use server"

import { getCollection } from "../_lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NoteFixType, NoteType } from "../_lib/types/note.type";
import { revalidateTag } from "next/cache";
import { validateNoteInput } from "../_lib/utils/validateNoteInput";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createNote = async (prevState, formData: FormData) => {
  const title = formData.get("title").toString()
  const content = formData.get("content").toString()
  const userId = formData.get("userid").toString()

  const failObject = {
    success: false,
    prevState: { title, content },
    errors: { title: "", content: "" }
  }

  validateNoteInput("title", title, failObject.errors)
  validateNoteInput("content", content, failObject.errors)

  if (failObject.errors.title || failObject.errors.content) {
    return failObject
  }

  const newNote = {
    title,
    content,
    author: userId,
    pinned: false,
  }
  const notesCollection = await getCollection("notes")
  const res = await notesCollection.insertOne(newNote)

  if (!res.insertedId.toString()) {
    failObject.errors.content = "Error en el servidor"
    return failObject
  }

  revalidateTag('notes')
  return {
    success: true,
    prevState: { title, content },
    errors: { title: "", content: "" }
  }
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const editNote = async (prevState, formData: FormData) => {

  const title = formData.get("title").toString()
  const content = formData.get("content").toString()
  const jsonNote = formData.get("note").toString()
  const note = JSON.parse(jsonNote) as NoteFixType

  if (note.title === title && note.content === content) return

  const failObject = {
    success: false,
    prevState: { title, content },
    errors: { title: "", content: "" }
  }

  validateNoteInput("title", title, failObject.errors)
  validateNoteInput("content", content, failObject.errors)

  if (failObject.errors.title !== "" || failObject.errors.content !== "")
    return failObject

  const notesCollection = await getCollection("notes")
  const res = await notesCollection.updateOne(
    { _id: new ObjectId(note._id) },
    {
      $set: { "title": title, "content": content }
    }
  )
  if (res.modifiedCount !== 1) {
    failObject.errors.content = "Error al editar nota"
    return failObject
  }

  revalidateTag('notes')
  return {
    success: true,
    prevState: { title, content },
    errors: { title: "", content: "" }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteNote = async (prevState, formData: FormData) => {
  const noteId = formData.get("noteid").toString()

  const notesCollection = await getCollection("notes")
  const res = await notesCollection.deleteOne({ "_id": new ObjectId(noteId) })
  if (res?.deletedCount !== 1) return { error: "No se pudo elimianr la nota" }
  revalidateTag('notes')
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pinNote = async (noteId: string) => {
  const notesCollection = await getCollection("notes")
  const actualNote = await notesCollection.findOne({"_id": new ObjectId(noteId)}) as NoteType
  const newPin = !actualNote.pinned
  await notesCollection.updateOne(
    { _id: new ObjectId(noteId) },
    {
      $set: { "pinned": newPin }
    }
  )
  revalidateTag('notes')
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getNoteById = async (noteId: string) => {
  const collection = await getCollection("notes")
  return await collection.findOne({ _id: new ObjectId(noteId) })
}