"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema, TodoType } from "./todo.schema"
import FormServer from "./FormServer"
import { addTodo2, ResType } from "./actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function FormClient() {

  const [inputValues, setInputValues] = useState({ title: "", content: "" })
  const [show, setShow] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

   const { register, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
   const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    const newTodo = Object.fromEntries(formData.entries())

    const responseObj = {
      success: false,
      prevState: newTodo as TodoType,
      errors: { title: "", content: "" }
    }

    const serverResult = await addTodo2(newTodo)
    setShow(false)
    //server validation
    if (!serverResult?.success && serverResult?.errors) {
      toast.error("Error Servidor")
      responseObj.errors = serverResult.errors
      return responseObj
    }

    toast.success("Todo añadido")
    setInputValues({ title: "", content: "" })
    router.push("/")
    // por que no me lo toma????

    return { success: true }

  }, null)
  
   const onSubmit:SubmitHandler<TodoType>  = (data) => {
    setInputValues({ title: data?.title, content: data?.content })
    formRef.current?.reset()
    setShow(true)
   }

   useEffect(() => {
    console.log("inputValues", inputValues)
  }, [inputValues])

  if(show) return (
    <FormServer inputValues={inputValues} setShow={setShow} formState={formState} formAction={formAction} isPending={isPending} />
  )

  return (
    <form ref={formRef} onSubmit={(handleSubmit(onSubmit))} className='flex gap-4 flex-col p-4 m-4 w-1/4'>

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
      <p className="text-red-500">{formState?.success === false && "ERROR al guardar todo"}</p>
      <p>{JSON.stringify(inputValues)}</p>

    </form>
  )
}

// resetear inputValues cuando todo esta bien
// dar un aviso con toast

// no resetear inputValues si hay error
