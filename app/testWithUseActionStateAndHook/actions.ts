"use server"

import { revalidatePath } from "next/cache"
import { todoSchema, TodoType } from "./todo.schema"
import { getErrorMessage } from "../../_lib/utils/getErrorMessage"

export const addTodo = async (newTodo: TodoType) => {

  //server validation
  let errors: { id: string, content: string }
  const { success, data, error } = todoSchema.safeParse(newTodo)
  if (!success) {
    const { id: idError, content: contentError } = error.flatten().fieldErrors
    errors = { id: idError ? idError[0] : "", content: contentError ? contentError[0] : "" }
    return { success: false, errors }
  }
  try {
    //insertar en DB
    revalidatePath("/")
    return { success: true, errors: { id: "", content: "" } }
  } catch (error) {
    return { success: false, errors: { id: "", content: getErrorMessage(error) } }
  }

}