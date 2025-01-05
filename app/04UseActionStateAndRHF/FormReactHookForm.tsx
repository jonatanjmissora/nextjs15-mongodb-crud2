"use client"

import { todoSchema, TodoType } from './todo.schema'
import { useForm, UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useRef } from 'react'
import SubmitBtn from './SubmitBtn'
import toast from 'react-hot-toast'
import { addTodo2 } from './actions'

export default function Form() {

  const formRef = useRef<HTMLFormElement>(null)
  const { register, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const [formState, formAction, isPending] = useActionState(addTodo2, null)
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    handleSubmit(() => {
      formRef.current?.submit()
      console.log(formState)
      if (formState?.success) {
        formRef.current?.reset()
        toast.success("Todo añadido")
      }
      else {
        toast.error("Error Servidor")
      }
    }
    )(evt)
  }

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={onSubmit}
        className='flex gap-4 flex-col p-4 border m-4'
      >

        <code>useActionState + RHF<br />
          1 - utilizo HFR para la validacion cliente<br />
          2 - y el useActionState para el servidor <br />
          3 - uso onSubmit, para ejecutar el handleSubmit del<br />
          4 - HFR y de ahi, invoco un<br />
          5 - href para que se ejecute un formRef.current?.submit()<br />
          Utlizo useActionState + RHF, no me gusta que reinicie la pagina con <br />
          problema: se pisan el onSubmit={ } y el action={ } en el mismo form
          el toast me toma el estado anterior
        </code>

        <h2 className='text-2xl font-bold tracking-wide'>useActionState + RHF</h2>
        <Input label="title" defaultValue={formState?.prevState?.title} error={errors.title?.message} register={register} />
        <Input label="content" defaultValue={formState?.prevState?.content} error={errors.content?.message} register={register} />

        <SubmitBtn />
        {formState?.success && <p className='text-green-700'>Todo enviado exitosamente</p>}
        {formState?.errors?.title && <p className='text-red-700'>{formState?.errors.title}</p>}
        {formState?.errors?.content && <p className='text-red-700'>{formState?.errors.content}</p>}
        <p>{JSON.stringify(formState)}</p>
      </form>
    </>
  )
}

const Input = ({ label, defaultValue, error, register }:
  {
    label: string, defaultValue: string, error: string,
    register: UseFormRegister<{ [key: string]: string }>
  }) => {

  return (
    <>
      <input
        className={`input input-primary text-center text-slate-200 ${error && 'input-error'}`}
        type="text"
        name={label}
        defaultValue={defaultValue}
        placeholder={`... ${label} ...`}
        {...register(`${label}`)}
      />
      <p>{error && error}</p>
    </>
  )
}


