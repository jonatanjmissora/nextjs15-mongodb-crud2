"use server"

import "server-only";
import { revalidatePath } from "next/cache"
import { todoSchema, TodoType } from "./todo.schema"
import { getErrorMessage } from "../../_lib/utils/getErrorMessage"

export type ResType = {
  success: boolean;
  prevState?: Record<string, string>,
  errors?: Record<string, string>
}

export const addTodo2 = async (prevState: ResType, formData: FormData) => {
  await new Promise(resolve => setTimeout(resolve, 1000))	// Simulate server latency
  const newTodo = Object.fromEntries(formData.entries()) as TodoType

  //server validation
  let errors: { title: string, content: string }
  const { success, data, error } = todoSchema.safeParse(newTodo)
  if (!success) {
    const { title: titleError, content: contentError } = error.flatten().fieldErrors
    errors = { title: titleError ? titleError[0] : "", content: contentError ? contentError[0] : "" }
    return { success: false, errors }
  }

  if(newTodo.title === "error") {
    return { success: false, errors: { title: "", content: "No se puede tener error en el titulo" } }
  }

  try {
    //insertar en DB
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false, errors: { title: "", content: getErrorMessage(error) } }
  }

}