"use server"

import { revalidatePath } from "next/cache"
import { todoSchema, TodoType } from "./todo.schema"
import { getErrorMessage } from "../../_lib/utils/getErrorMessage"

export const addTodo = async (newTodo: TodoType) => {

  //server validation
  let errors: { id: string, content: string }
  const { success, data, error } = todoSchema.safeParse(newTodo)
  if (!success) {
    const { id, content } = error.flatten().fieldErrors
    if (id) errors = { ...errors, id: id[0] }
    if (content) errors = { ...errors, content: content[0] }
    return { success: false, errors }
  }
  try {
    //insertar en DB
    revalidatePath("/")
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }

}