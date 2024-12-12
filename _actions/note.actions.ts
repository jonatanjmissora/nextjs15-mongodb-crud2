"use server"

import { getCollection } from "../_lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NoteFixType } from "../_lib/types/note.type";
import { revalidateTag } from "next/cache";
import { validateNoteInput } from "../_lib/utils/validateNoteInput";
import { noteSchema, NoteType } from "../_lib/schema/schema.note";
import { getErrorMessage } from "../_lib/utils/getErrorMessage";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const insertNote = async (newNote: NoteType) => {
  const notesCollection = await getCollection("notes")
  return await notesCollection.insertOne(newNote)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createNote = async (newNote: NoteType) => {
  
  const failObject = {
    success: false,
    prevState: { title: newNote.title, content: newNote.content },
    errors: { title: "", content: "" }
  }

  const { success, data, error } = noteSchema.safeParse(newNote)
  if (!success) {
    const { title: titleError, content: contentError } = error.flatten().fieldErrors
    if (titleError) failObject.errors.title = titleError[0]
    if (contentError) failObject.errors.content = contentError[0]
    return failObject
  }

  try {
      //insertar en DB
      const res = await insertNote(data)
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

export const editNote = async (id: string, newNote: NoteType) => {
  
  const failObject = {
    success: false,
    prevState: { title: newNote.title, content: newNote.content },
    errors: { title: "", content: "" }
  }

  const { success, data, error } = noteSchema.safeParse(newNote)
  if (!success) {
    const { title: titleError, content: contentError } = error.flatten().fieldErrors
    if (titleError) failObject.errors.title = titleError[0]
    if (contentError) failObject.errors.content = contentError[0]
    return failObject
  }

  try {
    const {title, content} = data
    console.log({data})
  const notesCollection = await getCollection("notes")
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

export const deleteNote = async (prevState: {error:string}, formData: FormData) => {
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