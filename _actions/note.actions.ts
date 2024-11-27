"use server"

import { redirect } from "next/navigation";
import { getCollection } from "../_lib/mongoConnect";
import { NoteType } from "../_components/Notes/NotesList";

type ErrorType = {
  [key: string]: string;
}

export const validateInput = async (label: string, inputValue: string, errors: ErrorType) => {
  let minChar, maxChar, labelStr
  const regex = /^[a-zA-Z0-9!?¿¡ ]*$/
  let actualValue = inputValue.trim()

  if (label === "title") {
    minChar = 3
    maxChar = 15
    labelStr = "titulo"
  }
  if (label === "content") {
    minChar = 4
    maxChar = 30
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
    return { succcess: false, prevState: { title, content }, errors }
  }

  const newNote = {
    title,
    content,
    author: userId,
    pinned: false,
  }
  const notesCollection = await getCollection("notes")
  const res = await notesCollection.insertOne(newNote)
  console.log({ res })

  redirect("/")

}