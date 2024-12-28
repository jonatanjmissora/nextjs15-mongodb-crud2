import { z } from "zod"

export const todoSchema = z.object({

  id: z
    .number()
    .min(1, { message: "Debe de tener mas de 1 caracter" })
    .optional(),
  content: z
    .string()
    .trim()
    .min(1, { message: "Debe de tener mas de 1 caracter" })
    .max(10, { message: "No puede tener mas de 10 caracteres" })

})

export type TodoType = z.infer<typeof todoSchema>