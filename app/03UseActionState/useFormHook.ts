import { useActionState } from "react";
import { todoSchema, TodoType } from "./todo.schema";
import toast from "react-hot-toast";
import { addTodo } from "./actions";

export type ResType = {
  success: boolean;
  prevState?: Record<string, string>,
  errors?: Record<string, string>,
  server?: string,
}

export const useLoginActionState = () => {

  const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    const newTodo = Object.fromEntries(formData.entries())

    const responseObj = {
      success: false,
      prevState: newTodo as TodoType,
      errors: { title: "", content: "" },
      server: ""
    }

    // client validation
    const { success, data, error } = todoSchema.safeParse(newTodo)
    if (!success) {
      const { title: titleError, content: contentError } = error.flatten().fieldErrors
      responseObj.errors = { title: titleError ? titleError[0] : "", content: contentError ? contentError[0] : "" }
      toast.error("Error Cliente")
      return responseObj
    }

    const { success: serverSuccess, message } = await addTodo(newTodo)
    //server validation
    if (!serverSuccess) {
      toast.error("Error Servidor")
      responseObj.server = message
      return responseObj
    }

    toast.success("Todo añadido")
    return {
      success: true, server: message
    }

  }, null)

  return [formState, formAction, isPending] as const
}
