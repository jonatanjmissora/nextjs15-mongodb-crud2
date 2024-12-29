"use server"

import { revalidatePath } from "next/cache"
import { getErrorMessage } from "../../_lib/utils/getErrorMessage"
import { todoSchema, TodoType } from "./todo.schema"

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

type ResponseType = {
  success: boolean;
  prevState: { id: number, content: string };
  errors: { id: string, content: string };
}

export const addTodo2 = async (prevState: ResponseType, formData: FormData) => {
  await new Promise(resolve => setTimeout(resolve, 2000))	// Simulate server latency
  console.log({ formData })
  return { success: true, prevState: { id: 5, content: "Algo" }, errors: { id: "", content: "" } }
}