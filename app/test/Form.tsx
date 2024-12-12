"use client"

import React, { useState } from 'react'
import { todoSchema } from './todo.schema'
import { addTodo } from './actions'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const defaultErrors = { id: "", content: "" }

export default function Form() {

  const [errors, setErrors] = useState<{ [key: string]: string }>(defaultErrors)
  const router = useRouter()

  const clientAction = async (formData: FormData) => {
    setErrors(defaultErrors)
    const content = formData.get("content") as string
    const newTodo = {
      id: 2,
      content
    }

    //client validation
    const { success, data, error } = todoSchema.safeParse(newTodo)
    if (!success) {
      const { id, content } = error.flatten().fieldErrors
      if (id) setErrors(prev => ({ ...prev, id: id[0] }))
      if (content) setErrors(prev => ({ ...prev, content: content[0] }))
      toast.error("Error en el cliente")
      return
    }

    const serverResult = await addTodo(data)
    if (!serverResult?.success && serverResult?.errors) {
      toast.error("Error en el servidor")
      return
    }
  }

  return (
    <form action={clientAction} className='flex gap-4 flex-col'>
      <h2 className='text-2xl font-bold tracking-wide'>Formulario</h2>
      <input className="hidden" name="id" defaultValue={2} />
      <p>{errors?.id && errors.id}</p>
      <input className="input input-primary" type="text" name="content" />
      <p>{errors?.content && errors.content}</p>
      <button className='btn btn-primary' type="submit">Crear</button>
    </form>
  )
}
