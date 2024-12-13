"use client"

import { useActionState, useState } from "react"
import { addTodo } from "./actions"
import toast from "react-hot-toast"
import { todoSchema } from "./todo.schema"

export default function FormWithHook() {

  const [errors, setErrors] = useState<{ [key: string]: string }>({ id: "", content: "" })
  const [formState, formAction, isPending] = useActionState(async (prevState, formData: FormData) => {
    setErrors({ id: "", content: "" })
    const newTodo = Object.fromEntries(formData.entries())

    //client validation
    const { success, data, error } = todoSchema.safeParse({ ...newTodo, id: Number(newTodo.id) })
    if (!success) {
      const { id: idError, content: contentError } = error.flatten().fieldErrors
      setErrors({
        id: idError ? idError[0] : "",
        content: contentError ? contentError[0] : ""
      })
      toast.error("Error Cliente")
      return {
        success: false,
        prevState: newTodo,
      }
    }
    toast.success("Success Ciente")

    const serverResult = await addTodo(data)
    console.log({ serverResult })
    if (!serverResult?.success && serverResult?.errors) {
      toast.error("Error Servidor")
    }

  }, null)

  return (
    <form action={formAction} className='flex gap-4 flex-col p-4 border m-4'>
      <h2 className='text-2xl font-bold tracking-wide'>Formulario 2</h2>

      <input className="input input-primary" type="number" name="id" defaultValue={formState?.prevState?.id} />
      <p>{errors?.id && errors.id}</p>

      <input className="input input-primary" type="text" name="content" defaultValue={formState?.prevState?.content} />
      <p>{errors?.content && errors.content}</p>

      <button className='btn btn-primary' type="submit" disabled={isPending}>{isPending ? "..." : "Crear"}</button>
    </form>
  )
}
