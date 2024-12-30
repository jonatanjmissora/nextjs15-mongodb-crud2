import { useActionState } from "react";
import { todoSchema, TodoType } from "./todo.schema";
import toast from "react-hot-toast";
import { addTodo } from "./actions";

export type ResType = {
  success: boolean;
  prevState?: Record<string, string>,
  errors?: Record<string, string>
}

export const useLoginActionState = () => {

  const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    const newTodo = Object.fromEntries(formData.entries())

    const responseObj = {
      success: false,
      prevState: newTodo as TodoType,
      errors: { title: "", content: "" }
    }

    //client validation
    const { success, data, error } = todoSchema.safeParse(newTodo)
    if (!success) {
      const { title: titleError, content: contentError } = error.flatten().fieldErrors
      responseObj.errors = { title: titleError ? titleError[0] : "", content: contentError ? contentError[0] : "" }
      toast.error("Error Cliente")
      return responseObj
    }
    
    const serverResult = await addTodo(data)
    //server validation
    if (!serverResult?.success && serverResult?.errors) {
      toast.error("Error Servidor")
      responseObj.errors = serverResult.errors
      return responseObj
    }
    return {
      success: true
    }

  }, null)

  return [formState, formAction, isPending] as const
}
