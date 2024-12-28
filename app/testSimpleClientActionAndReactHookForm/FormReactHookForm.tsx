"use client"

import { todoSchema, TodoType } from './todo.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addTodo, addTodo2 } from './actions'
import toast from 'react-hot-toast'
import { useActionState } from 'react'

export default function Form() {

  const { register, formState: { errors, isValid } } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })

  /*
  //aca uso solo el handlesubmit del RHF para disparar la server action
  const clientAction: () => void = handleSubmit(async (formData: TodoType) => {

    //verifico si los datos estan correctos por el usuario, con un modal de confirmacion
    alert("ESTAS SEGURO?")

    //server action
    const serverResult = await addTodo(formData)
    if (!serverResult?.success && serverResult?.errors) {
      toast.error("Error en el servidor")
      return
    }
    toast.success("Todo creado")
  })
*/

  const [formState, formAction, isPending] = useActionState(addTodo2, null)

  return (
    <>
      <p>{JSON.stringify(formState)}</p>
      <form action={formAction} className='flex gap-4 flex-col p-4 border m-4'>
        <h2 className='text-2xl font-bold tracking-wide'>Client Action + React Hook Form</h2>
        <input className="hidden" name="id" defaultValue={2} />
        <p>{errors.id?.message}</p>
        <input className="input input-primary" type="text" name="content" {...register("content")} />
        <p>{errors.content?.message}</p>
        <button className='btn btn-primary' type="submit">{isPending ? "---" : "Crear"}</button>
      </form>
    </>
  )
}


