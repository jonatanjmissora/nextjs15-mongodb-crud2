"use server"

import { revalidatePath } from "next/cache"
import { todoSchema, TodoType } from "./todo.schema"
import { getErrorMessage } from "../../_lib/utils/getErrorMessage"

export const addTodo = async (newTodo: TodoType) => {

  //server validation
  let errors: { title: string, content: string }
  const { success, data, error } = todoSchema.safeParse(newTodo)
  if (!success) {
    const { title: titleError, content: contentError } = error.flatten().fieldErrors
    errors = { title: titleError ? titleError[0] : "", content: contentError ? contentError[0] : "" }
    return { success: false, errors }
  }
  try {
    //insertar en DB
    revalidatePath("/")
    return { success: true, errors: { title: "", content: "" } }
  } catch (error) {
    return { success: false, errors: { title: "", content: getErrorMessage(error) } }
  }

}