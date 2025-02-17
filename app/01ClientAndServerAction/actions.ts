"use server"

import { revalidatePath } from "next/cache"
import { todoSchema, TodoType } from "./todo.schema"
import { getErrorMessage } from "../../_lib/utils/getErrorMessage"

export const addTodo = async (newTodo: TodoType) => {
  await new Promise(resolve => setTimeout(resolve, 1000))	// Simulate server latency

  //server validation
  let errors: { title: string, content: string }
  const { success, data, error } = todoSchema.safeParse(newTodo)
  if (!success) {
    const { title: titleError, content: contentError } = error.flatten().fieldErrors
    errors = { title: titleError ? titleError[0] : "", content: contentError ? contentError[0] : "" }
    return { success: false, errors }
  }

  if (newTodo.title === "error") return { success: false, errors: { title: "No puede contener error", content: "" } }

  try {
    //insertar en DB
    revalidatePath("/")
    return { success: true, errors: { title: "", content: "" } }
  } catch (error) {
    console.log(error)
    return { success: false, errors: { title: "", content: getErrorMessage(error) } }
  }

}