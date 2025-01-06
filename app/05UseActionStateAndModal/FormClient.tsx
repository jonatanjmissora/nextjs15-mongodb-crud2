"use client"

import { useState } from "react"
import { useLoginActionState } from "./useFormHook"
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema, TodoType } from "./todo.schema"

export default function FormClient() {

  const [inputValues, setInputValues] = useState({title: "", content: ""})
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  const { register, reset, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const [formState, formAction, isPending] = useLoginActionState(setShowConfirm, reset)

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    const title = data?.title || ""
    const content = data?.content || ""
    setShowConfirm(prev => !prev)
    setInputValues({title, content})
  }
  
  return (
    <>
      {
        showConfirm 
        ? (
          <form action={formAction} className='flex gap-4 flex-col p-4 m-4 w-1/2'>

            <div className="text-2xl">
              <h2>¿ Confirma estos datos ?</h2>
              <p>title: {inputValues.title}</p>
              <p>content: {inputValues.content}</p>
            </div>

            <Input label='title' value={inputValues.title} error={errors?.title?.message} register={register} className="hidden"/>
            <Input label='content' value={inputValues.content} error={errors?.content?.message} register={register} className="hidden"/>

            <button type="submit" className="btn btn-primary" disabled={isPending}>Confirmar</button>
            <button type="button" className="btn btn-error" onClick={() => setShowConfirm(prev => !prev)}>Cancelar</button>

          </form>
        )
        : (
          <form onSubmit={handleSubmit(onSubmit)}  className='flex gap-4 flex-col p-4 m-4 w-1/4'>
      
            <h2 className='text-2xl font-bold tracking-wide'>useActionState 👍</h2>
      
            <Input label='title' value={formState?.prevState?.title} error={errors?.title?.message} register={register}/>
            <Input label='content' value={formState?.prevState?.content} error={errors?.content?.message} register={register}/>
      
            <button type="submit" className="btn btn-primary" >Crear</button>

            {<p className={`${formState?.success ? "text-green-700" : "text-red-700"}`}>{formState?.server && formState?.server}</p>}
          </form>
        )
      }
    </>
  )
}

const Input = ({ label, value, error, register, className }: { label: string, value: string, error: string, register: UseFormRegister<{ [key: string]: string }>, className?: string }) => {
  return (
    <>
      <input
        className={`input input-primary text-slate-600 text-center ${error && 'input-error'} ${className}`}
        type="text"
        name={label}
        defaultValue={value}
        placeholder={`... ${label} ...`}
        {...register(`${label}`)}
      />
      <p>{error && error}</p>
    </>
  )
}