"use client"

import { useActionState, useEffect, useState } from "react"
import { addTodo, addTodo2 } from "./actions"
import toast from "react-hot-toast"

export default function FormWithHook() {

  const [errors, setErrors] = useState<{ [key: string]: string }>({ id: "", content: "" })
  const [formState, serverAction, isPending] = useActionState(addTodo2, {
    success: null,
    prevState: { content: "" },
    errors: ""
  })

  useEffect(() => {
    if (formState?.success === true) toast.success("Correcto")
    else if (formState?.success === false) toast.error("Incorrecto")
  }, [formState])

  const clientAction = async (formData: FormData) => {
    //aca hago la validacion del cliente
    serverAction(formData)
    //respondo la validacion del servidor, dentro del formState
  }

  return (
    <form action={clientAction} className='flex gap-4 flex-col'>
      <h2 className='text-2xl font-bold tracking-wide'>Formulario 2</h2>
      <input className="hidden" name="id" defaultValue={2} />
      <p>{errors?.id && errors.id}</p>
      <input className="input input-primary" type="text" name="content" />
      {formState?.errors && <p>{formState.errors}</p>}
      <button className='btn btn-primary' type="submit">Crear</button>
    </form>
  )
}
