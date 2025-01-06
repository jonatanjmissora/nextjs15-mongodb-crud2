"use client"

import { useRef, useState } from "react"
import { todoSchema, TodoType } from "./todo.schema"
import toast from "react-hot-toast"
import { addTodo } from "./actions"
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export default function FormWithUseActionState() {

  const [serverResponse, setServerResponse] = useState({ success: false, message: "" })
  const { register, reset, formState: { errors, isSubmitting }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit: SubmitHandler<TodoType> = async (data) => {

    setServerResponse({ success: false, message: "" })
    const response = await addTodo(data)
    if (!response.success) {
      toast.error("Error en el servidor")
    }
    else {
      toast.success("Todo creado exitosamente")
      reset()
    }
    setServerResponse(response)
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col p-4 border m-4'>

      <code>onSubmit="{"hanldeSubmit(onSubmit)"}"<br />
        1 - verificacion del cliente con RHF<br />
        2 - invoco server action addTodo(newTodo)<br />
        3 - dentro del onSubmit<br />
        NO utlizo useActionState<br />
      </code>

      <h2 className='text-2xl font-bold tracking-wide'>Server Action + RHF 👍</h2>

      <Input label={"title"} register={register} error={errors?.title?.message} />
      <Input label={"content"} register={register} error={errors?.content?.message} />

      <button className='btn btn-primary' type="submit" disabled={isSubmitting}>Crear</button>

      {<p className={`${serverResponse.success ? "text-green-700" : "text-red-700"}`}>{serverResponse?.message && serverResponse.message}</p>}

    </form>
  )
}

const Input = ({ label, register, error }: { label: string, register: UseFormRegister<{ [key: string]: string }>, error: string }) => {
  return (
    <>
      <input
        className={`input input-primary text-center text-slate-900 ${error && 'input-error'}`}
        type="text"
        name={label}
        placeholder={`... ${label} ...`}
        {...register(`${label}`)}
      />
      <p>{error && error}</p>
    </>
  )
}
