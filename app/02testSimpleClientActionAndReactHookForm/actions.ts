"use server"

import { revalidatePath } from "next/cache"
import { getErrorMessage } from "../../_lib/utils/getErrorMessage"
import { todoSchema, TodoType } from "./todo.schema"

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

type ResponseType = {
  success: boolean;
  prevState: { title: string, content: string };
  errors: { title: string, content: string };
}

export const addTodo2 = async (prevState: ResponseType, formData: FormData): Promise<ResponseType> => {
  await new Promise(resolve => setTimeout(resolve, 1000))	// Simulate server latency

  const title = formData.get("title") as string
  const content = formData.get("content") as string

  const responseObj = {
    success: false,
    prevState: { title, content },
    errors: { title: "", content: "" }
  }

  //server validation
  const {success, data, error} = todoSchema.safeParse({title, content})
  if(!success) {
    const { title: titleError, content: contentError } = error.flatten().fieldErrors
    responseObj.errors = { title: titleError ? titleError[0] : "", content: contentError ? contentError[0] : "" }
    return responseObj
  }

  if(title.includes("error")) {
    responseObj.errors.title = "No puede contener la palabra 'error'"
    return responseObj
  }

  responseObj.success = true
  return responseObj
}