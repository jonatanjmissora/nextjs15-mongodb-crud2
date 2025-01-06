import { useActionState } from "react";
import { todoSchema, TodoType } from "./todo.schema";
import toast from "react-hot-toast";
import { addTodo } from "./actions";
import { UseFormReset } from "react-hook-form";

export type ResType = {
  success: boolean;
  prevState?: Record<string, string>,
  message?: string,
}

export const useTodoActionState = (setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>, reset: UseFormReset<{
  title?: string;
  content?: string;
}>) => {

  const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    const newTodo = Object.fromEntries(formData.entries()) as TodoType

    const responseObj = {
      success: false,
      prevState: newTodo as TodoType,
      message: ""
    }

    const { success: serverSuccess, message } = await addTodo(newTodo)
    //server validation
    if (!serverSuccess) {
      toast.error("Error Servidor")
      responseObj.message = message
      setShowConfirm(false)
      return { success: false, prevState: newTodo, message }
    }

    toast.success("Todo añadido")
    setShowConfirm(false)
    reset()
    return {
      success: true, prevState: { title: "", content: "" }, message
    }

  }, null)

  return [formState, formAction, isPending] as const
}
