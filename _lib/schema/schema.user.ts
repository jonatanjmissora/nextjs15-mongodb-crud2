import { ObjectId } from "mongodb"
import { z } from "zod"

const nameValidation = new RegExp(
  /^[a-zA-Z0-9]*$/
)

const passwordValidation = new RegExp(
  /^[a-zA-Z0-9#&*-_]*$/
)

export const userSchema = z.object({

  _id: z.instanceof(ObjectId).optional(),

  username: z
    .string()
    .trim()
    .min(1, { message: "El nombre debe tener mas de 1 caracter" })
    .max(20, { message: "El nombre no puede tener mas de 20 caracteres" })
    .regex(nameValidation, { message: "El nombre no es valido" }),

  userpassword: z
    .string()
    .trim()
    .min(1, { message: "La contraseña debe tener mas de 1 caracter" })
    .max(10, { message: "La contraseña no puede tener mas de 10 caracteres" })
    .regex(passwordValidation, { message: "La contraseña no es valida" })
})

export type UserType = z.infer<typeof userSchema>