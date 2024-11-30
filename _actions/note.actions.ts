"use server"

import { getCollection } from "../_lib/mongoConnect";
import { ObjectId } from "mongodb";
import { ErrorType } from "../_lib/types/error.type";
import { NoteFixType } from "../_lib/types/note.type";
import { revalidateTag } from "next/cache";

export const validateInput = async (label: string, inputValue: string, errors: ErrorType) => {
  let minChar, maxChar, labelStr
  const regex = /^[a-zA-Z0-9-_!?¿¡ ]*$/
  let actualValue = inputValue.trim()

  if (label === "title") {
    minChar = 3
    maxChar = 20
    labelStr = "titulo"
  }
  if (label === "content") {
    minChar = 4
    maxChar = 100
    labelStr = "contenido"
  }
  if (typeof inputValue !== "string") actualValue = ""
  if (actualValue.length <= minChar) errors[label] = ` El ${labelStr} debe tener mas de ${minChar} caracteres.`
  if (actualValue.length >= maxChar) errors[label] = ` El ${labelStr} debe tener menos de ${maxChar} caracteres.`
  if (actualValue === "") errors[label] = ` Debes ingresar ${labelStr}.`

  if (!regex.test(inputValue)) errors[label] += ` El ${labelStr} debe contener caracteres válidos}.`
}

export const createNote = async (prevState, formData: FormData) => {
  const title = formData.get("title").toString()
  const content = formData.get("content").toString()
  const userId = formData.get("userid").toString()

  const errors = { title: "", content: "" }
  validateInput("title", title, errors)
  validateInput("content", content, errors)

  if (errors.title || errors.content) {
    return { success: false, prevState: { title, content }, errors }
  }

  const newNote = {
    title,
    content,
    author: userId,
    pinned: false,
  }
  const notesCollection = await getCollection("notes")
  const res = await notesCollection.insertOne(newNote)
  if (res.insertedId) {
    revalidateTag('notes')
    return { success: true, prevState: null, errors: null }
  }
  else return { success: false, prevState: { title, content }, errors: { title: "", content: "No se pudo crear la nota" } }

}

export const editNote = async (prevState, formData: FormData) => {

  const title = formData.get("title").toString()
  const content = formData.get("content").toString()
  const jsonNote = formData.get("note").toString()
  const note = JSON.parse(jsonNote) as NoteFixType

  if (note.title === title && note.content === content) return { success: null, prevState: null, errors: null }

  const errors = { title: "", content: "" }

  validateInput("title", title, errors)
  validateInput("content", content, errors)

  if (errors.title !== "" || errors.content !== "")
    return { success: false, prevState: { title, content }, errors }

  const notesCollection = await getCollection("notes")
  const res = await notesCollection.updateOne(
    { _id: new ObjectId(note._id) },
    {
      $set: { "title": title, "content": content }
    }
  )
  if (res.modifiedCount === 1) {
    revalidateTag('notes')
    return { success: true, prevState: null, errors: null }
  }
  else
    return { success: false, prevState: null, errors: { title: "", content: "Error al editar nota" } }
}

export const deleteNote = async (prevState, formData: FormData) => {
  const noteId = formData.get("noteid").toString()

  const notesCollection = await getCollection("notes")
  const res = await notesCollection.deleteOne({ "_id": new ObjectId(noteId) })
  if (res?.deletedCount !== 1) return { error: "No se pudo elimianr la nota" }
  revalidateTag('notes')
}

export const pinNote = async (noteId: string) => {
  const notesCollection = await getCollection("notes")
  await notesCollection.updateOne(
    { _id: new ObjectId(noteId) },
    {
      $set: { "pinned": true }
    }
  )
  revalidateTag('notes')
}

export const getNoteById = async (noteId: string) => {
  const collection = await getCollection("notes")
  return await collection.findOne({ _id: new ObjectId(noteId) })
}