"use client"

import React, { useState } from 'react'
import { todoSchema } from './todo.schema'
import { addTodo } from './actions'
import toast from 'react-hot-toast'
import SubmitBtn from './SubmitBtn'

const defaultErrors = { title: "", content: "" }

export default function Form() {

  const [inputFields, setInputFields] = useState(defaultErrors)
  const [errors, setErrors] = useState(defaultErrors)

  const clientAction = async (formData: FormData) => {
    setErrors(defaultErrors)
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    setInputFields({ title, content })
    const newTodo = { title, content }

    //client validation
    const { success, data, error } = todoSchema.safeParse(newTodo)
    if (!success) {
      const { title: titleError, content: contentError } = error.flatten().fieldErrors
      if (titleError) setErrors(prev => ({ ...prev, title: titleError[0] }))
      if (contentError) setErrors(prev => ({ ...prev, content: contentError[0] }))
      toast.error("Error en el cliente")
      return
    }

    const serverResult = await addTodo(data)
    // server validation
    if (!serverResult?.success && serverResult?.errors) {
      if (serverResult?.errors.title) setErrors(prev => ({ ...prev, title: serverResult?.errors.title }))
      if (serverResult?.errors.content) setErrors(prev => ({ ...prev, content: serverResult?.errors.content }))
      toast.error("Error en el server")
      return
    }

    toast.success("Todo creado")
  }

  return (
    <form action={clientAction} className='flex gap-4 flex-col p-4 border m-4'>

      <code>action="{"clientAction"}"<br />
        1 - invoco clientAction(formData)<br />
        2 - verificacion del cliente, puedo usar toast<br />
        3 - invoco server action addTodo(newTodo)<br />
        4 - verificacion del servidor, accion en la DB<br />
        5 - puedo usar la respuesta del servidor<br />
        NO utlizo useActionState ni RHF, si utilizo useState<br />
      </code>

      <h2 className='text-2xl font-bold tracking-wide'>Simple Client Action</h2>
      <Input label="title" defaultValue={inputFields.title} error={errors.title} />
      <Input label="content" defaultValue={inputFields.content} error={errors.content} />
      <SubmitBtn />
    </form>
  )
}

const Input = ({ label, defaultValue, error }: { label: string, defaultValue: string, error: string }) => {
  return (
    <>
      <input
        className="input input-primary text-center"
        type="text"
        name={label}
        defaultValue={defaultValue}
        placeholder={`... ${label} ...`}
      />
      <p>{error && error}</p>
    </>
  )
}
