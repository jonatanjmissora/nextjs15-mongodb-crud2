"use client"

import { useActionState, useRef } from "react"
import { todoSchema, TodoType } from "./todo.schema"
import toast from "react-hot-toast"
import { addTodo } from "./actions"



type ResType = {
  success: boolean,
  prevState: { id: number, content: string },
  errors: { id: string, content: string }
}

export default function FormWithUseActionState() {

  const formRef = useRef<HTMLFormElement>(null)
  const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData) => {
    const newTodo = Object.fromEntries(formData.entries())

    const responseObj = {
      success: true,
      prevState: newTodo as TodoType,
      errors: { id: "", content: "" }
    }

    //client validation
    const { success, data, error } = todoSchema.safeParse({ ...newTodo, id: Number(newTodo.id) })
    if (!success) {
      const { id: idError, content: contentError } = error.flatten().fieldErrors
      responseObj.errors = { id: idError ? idError[0] : "", content: contentError ? contentError[0] : "" }
      toast.error("Error Cliente")
      return responseObj
    }
    toast.success("Success Ciente")

    const serverResult = await addTodo(data)
    //server validation
    if (!serverResult?.success && serverResult?.errors) {
      toast.error("Error Servidor")
      responseObj.errors = serverResult.errors
      return responseObj
    }
    return {
      success: true,
      prevState: { id: null, content: "" },
      errors: { id: "", content: "" }
    }

  }, null)

  return (
    <form ref={formRef} action={formAction} className='flex gap-4 flex-col p-4 border m-4'>
      {JSON.stringify(formState)}
      <h2 className='text-2xl font-bold tracking-wide'>Formulario 2</h2>

      <input className="input input-primary" type="number" name="id" defaultValue={formState?.prevState?.id} />
      <p>{formState?.errors?.id && formState?.errors.id}</p>

      <input className="input input-primary" type="text" name="content" defaultValue={formState?.prevState?.content} />
      <p>{formState?.errors?.content && formState?.errors.content}</p>

      <button className='btn btn-primary' type="submit" disabled={isPending}>{isPending ? "..." : "Crear"}</button>
    </form>
  )
}
