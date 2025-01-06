import { useActionState } from "react";
import { TodoType } from "./todo.schema";
import toast from "react-hot-toast";
import { addTodo } from "./actions";
import { UseFormReset } from "react-hook-form";

export type ResType = {
  success: boolean;
  prevState: { title?: string, content?: string };
  message: string;
}

export const useTodoActionState = (reset: UseFormReset<{
  title?: string;
  content?: string;
}>) => {

  const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    const newTodo = Object.fromEntries(formData.entries()) as TodoType

    const serverResponse = await addTodo(newTodo)
    //server validation
    if (!serverResponse.success) toast.error("Error Servidor")
    else {
      toast.success("Todo añadido")
      reset()
    }
    return serverResponse

  }, null)

  return [formState, formAction, isPending] as const
}
