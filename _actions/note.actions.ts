"use server"

import { getCollection } from "../_lib/mongoConnect";
import { ObjectId } from "mongodb";
import { revalidateTag, unstable_cache } from "next/cache";
import { noteSchema, NoteType } from "../_lib/schema/schema.note";
import { getErrorMessage } from "../_lib/utils/getErrorMessage";
import getUserFromCookie from "../_lib/utils/getUser";
import { TokenType } from "../_lib/types/user.types";
import { NoteFixType } from "../_lib/types/note.type";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCachedUserNotes = unstable_cache(async (userId: ObjectId) => {

  const notesCollection = await getCollection("notes")
  return await notesCollection.find({ author: userId }).toArray()
},
  ["notes"],
  {
    tags: ['notes'],
    revalidate: 3600,
  }
)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createNote = async (userId: string, newNote: NoteType) => {

  const failObject = {
    success: false,
    prevState: { title: newNote?.title, content: newNote?.content },
    errors: { title: "", content: "" }
  }

  const user = await getUserFromCookie() as TokenType
  if (!user || user._id !== userId) return failObject

  const note = {
    title: newNote.title,
    content: newNote.content,
    author: userId,
    pinned: false,
  }

  // data validation
  const { success, data, error } = noteSchema.safeParse(note)
  if (!success) {
    const { title: titleError, content: contentError } = error.flatten().fieldErrors
    failObject.errors = {
      title: titleError ? titleError[0] : "",
      content: contentError ? contentError[0] : ""
    }
    return failObject
  }

  try {
    // db validation
    const notesCollection = await getCollection("notes")
    const res = await notesCollection.insertOne(note)
    if (!res.insertedId.toString()) {
      failObject.errors.content = "Error en el servidor"
      return failObject
    }

    revalidateTag('notes')
    return {
      success: true,
      prevState: { title: newNote.title, content: newNote.content },
      errors: { title: "", content: "" }
    }

  } catch (error) {
    failObject.errors.content = getErrorMessage(error)
    return failObject
  }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const editNote = async (userId: string, id: string, newNote: NoteType) => {

  const failObject = {
    success: false,
    prevState: { title: newNote.title, content: newNote.content },
    errors: { title: "", content: "" }
  }
  const user = await getUserFromCookie() as TokenType
  if (!user || user._id !== userId) return failObject

  //  data validation
  const { success, data, error } = noteSchema.safeParse(newNote)
  if (!success) {
    const { title: titleError, content: contentError } = error.flatten().fieldErrors
    failObject.errors = {
      title: titleError ? titleError[0] : "",
      content: contentError ? contentError[0] : ""
    }
    return failObject
  }

  try {
    const { title, content } = data
    const notesCollection = await getCollection("notes")
    // db validation
    const res = await notesCollection.updateOne(
      { _id: new ObjectId(id) },
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
  } catch (error) {
    failObject.errors.content = getErrorMessage(error)
    return failObject
  }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteNote = async (userId: string, noteId: string) => {

  const user = await getUserFromCookie() as TokenType
  if (!user || user._id !== userId) return { error: "No hay usuario logueado" }

  const notesCollection = await getCollection("notes")
  const res = await notesCollection.deleteOne({ "_id": new ObjectId(noteId) })
  if (res?.deletedCount !== 1) return { error: "No se pudo elimianr la nota" }
  revalidateTag('notes')
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pinNote = async (noteId: string) => {
  const notesCollection = await getCollection("notes")
  const actualNote = await notesCollection.findOne({ "_id": new ObjectId(noteId) })
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