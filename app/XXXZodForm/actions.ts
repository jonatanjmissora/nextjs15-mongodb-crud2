"use server"

import { revalidatePath } from "next/cache"
import { todoSchema, TodoType } from "./todo.schema"
import { getErrorMessage } from "../../_lib/utils/getErrorMessage"

export const addTodo = async (newTodo: TodoType) => {

  //server validation
  const result = todoSchema.safeParse(newTodo)

  if (!result?.success) {
    let errorMessage: ""
    result.error.issues.forEach(issue =>
      errorMessage = errorMessage + issue.path[0] + ":" + issue.message + "."
    )
    return { error: errorMessage }
  }

  try {
    //insertar en DB
    revalidatePath("/XXXZodForm")
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }

}