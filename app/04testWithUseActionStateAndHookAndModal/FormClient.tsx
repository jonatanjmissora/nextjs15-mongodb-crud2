"use client"

import { useActionState, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema, TodoType } from "./todo.schema"
import FormServer from "./FormServer"
import { addTodo2 } from "./actions"

export default function FormClient() {

  const [inputValues, setInputValues] = useState({ title: "", content: "" })
  const [show, setShow] = useState(false)

   const { register, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })

   const onSubmit:SubmitHandler<TodoType>  = (data) => {
    setInputValues({ title: data?.title || "", content: data?.content || "" })
    setShow(true)
   }

   const [formState, formAction, isPending] = useActionState(addTodo2, null)

  useEffect(() => {
    setShow(false)
  }, [formState?.success])

  if(show) return (
    <FormServer inputValues={inputValues} setShow={setShow} formState={formState} formAction={formAction} isPending={isPending} />
  )

  return (
    <form onSubmit={(handleSubmit(onSubmit))} className='flex gap-4 flex-col p-4 m-4 w-1/4'>

      <h2 className='text-2xl font-bold tracking-wide'>useActionState + Modal</h2>

      <input 
        className="input" 
        type="text" 
        name="title" 
        placeholder="... title" 
        defaultValue={inputValues?.title}
        {...register("title")}
        />
      <p>{errors.title?.message}</p>

      <input 
        className="input" 
        type="text" 
        name="content" 
        placeholder="...content" 
        defaultValue={inputValues?.content}
        {...register("content")}
        />
      <p>{errors.content?.message}</p>

      <button className='btn btn-primary' type="submit">Creamos</button>
      <p>{JSON.stringify(inputValues)}</p>
      <p>{formState?.success === true ? "TRUE" : "FALSE"}</p>
      <p>{formState?.success === false && "ERROR"}</p>

    </form>
  )
}


