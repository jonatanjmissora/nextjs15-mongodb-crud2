"use client"

import React, { useState } from 'react'
import { todoSchema } from './todo.schema'
import { addTodo } from './actions'
import toast from 'react-hot-toast'

const defaultErrors = { id: "", content: "" }

export default function Form() {

  const [inputFields, setInputFields] = useState<{ [key: string]: string }>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>(defaultErrors)

  const clientAction = async (formData: FormData) => {
    setErrors(defaultErrors)
    const content = formData.get("content") as string
    setInputFields({ content })
    const newTodo = {
      id: 2,
      content
    }

    //client validation
    const { success, data, error } = todoSchema.safeParse(newTodo)
    if (!success) {
      const { id: idError, content: contentError } = error.flatten().fieldErrors
      if (idError) setErrors(prev => ({ ...prev, id: idError[0] }))
      if (contentError) setErrors(prev => ({ ...prev, content: contentError[0] }))
      toast.error("Error en el cliente")
      return
    }

    const serverResult = await addTodo(data)
    if (!serverResult?.success && serverResult?.errors) {
      toast.error("Error en el servidor")
      return
    }

    toast.success("Todo creado")
  }

  return (
    <form action={clientAction} className='flex gap-4 flex-col p-4 border m-4'>
      <h2 className='text-2xl font-bold tracking-wide'>Simple Client Action</h2>
      <input className="hidden" name="id" defaultValue={2} />
      <p>{errors?.id && errors.id}</p>
      <input className="input input-primary" type="text" name="content" defaultValue={inputFields?.content} />
      <p>{errors?.content && errors.content}</p>
      <button className='btn btn-primary' type="submit">Crear</button>
    </form>
  )
}
