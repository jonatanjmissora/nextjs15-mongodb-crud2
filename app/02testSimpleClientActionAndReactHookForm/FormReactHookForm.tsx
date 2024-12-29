"use client"

import { todoSchema, TodoType } from './todo.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addTodo2 } from './actions'
import { useActionState, useRef } from 'react'

export default function Form() {

  const formRef = useRef<HTMLFormElement>(null)
  const { register, formState: { errors, isValid }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const [formState, formAction] = useActionState(addTodo2, null)

  return (
    <>
      <form 
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit(() => formRef.current?.submit())}
       className='flex gap-4 flex-col p-4 border m-4'
       >
        <h2 className='text-2xl font-bold tracking-wide'>Client Action + React Hook Form</h2>
        <input className="input input-primary" type="text" name="title" {...register("title")} defaultValue={formState?.prevState?.title}/>
        <p>{errors?.title?.message}</p>
        <p>{formState?.errors?.title}</p>
        <input className="input input-primary" type="text" name="content" {...register("content")} defaultValue={formState?.prevState?.content}/>
        <p>{errors?.content?.message}</p>
        <p>{formState?.errors?.content}</p>
        <button className='btn btn-primary'  type="submit" >{"Crear"}</button>
      </form>
    </>
  )
}


