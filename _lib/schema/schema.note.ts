import { ObjectId } from "mongodb"
import { z } from "zod"

const title = new RegExp(
  /^[a-zA-Z0-9!-_? ]*$/
)

const content = new RegExp(
  /^[a-zA-Z0-9#&*-_!?. ]*$/
)

const author = new RegExp(
  /^[a-zA-Z0-9].{8,}$/ 
)

export const noteSchema = z.object({

  _id: z.instanceof(Object).transform((_id) => _id.toString()).optional(),

  title: z
    .string()
    .trim()
    .min(1, { message: "El titulo debe tener mas de 1 caracter" })
    .max(20, { message: "El titulo no puede tener mas de 20 caracteres" })
    .regex(title, { message: "El titulo no es valido" }),

  content: z
    .string()
    .trim()
    .min(1, { message: "El contenido debe tener mas de 1 caracter" })
    .max(50, { message: "El contenido no puede tener mas de 50 caracteres" })
    .regex(content, { message: "El contenido no es valida" }),

  author: z
    .string()
    .trim()
    .regex(author),

  pinned: z.boolean()

})

export type NoteType = z.infer<typeof noteSchema>