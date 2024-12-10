"use client"

import React, { useState } from 'react'
import { todoSchema } from './todo.schema'
import toast from 'react-hot-toast'
import { addTodo } from './actions'

export default function Form() {

  const [errors, setErrors] = useState<{ [key: string]: string }>({ id: "", content: "" })

  const clientAction = async (formData: FormData) => {
    const content = formData.get("content")
    const newTodo = {
      id: "2",
      content
    }

    //client validation
    const { success, data, error } = todoSchema.safeParse(newTodo)
    if (!success) {
      const { id, content } = error.flatten().fieldErrors
      if (id) setErrors(prev => {...prev, id: id[0]})
    // const errorMessage = {
    //   id: error.flatten()?.fieldErrors?.id ? error.flatten()?.fieldErrors?.id[0] : "",
    //   content: error.flatten().fieldErrors.content ? error.flatten().fieldErrors.content[0].toString() : ""
    // }
    // setErrors(errorMessage)

    // console.log(error.flatten()?.fieldErrors.id)
    // error.issues.forEach(issue =>
    //   errorMessage = errorMessage + issue.path[0] + ":" + issue.message + "."
    // )
    // toast.error(`client: ${JSON.stringify(errorMessage)}`)
    return
  }

  // const serverResult = await addTodo(data)
  // if (serverResult?.error) {
  //   toast.error(`server: ${serverResult.error}`)
  // }
}

return (
  <form action={clientAction} className='flex gap-4 flex-col'>
    <h2 className='text-2xl font-bold tracking-wide'>Formulario</h2>
    <p>{errors?.id && errors.id}</p>
    <input className="input input-primary" type="text" name="content" />
    <p>{errors?.content && errors.content}</p>
    <button className='btn btn-primary' type="submit">Crear</button>
  </form>
)
}
