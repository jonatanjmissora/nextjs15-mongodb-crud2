"use client"

import { todoSchema, TodoType } from './todo.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addTodo2 } from './actions'
import { useActionState, useRef } from 'react'
import SubmitBtn from './SubmitBtn'

export default function Form() {

  const formRef = useRef<HTMLFormElement>(null)
  const { register, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const [formState, formAction, isPending] = useActionState(addTodo2, null)
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    handleSubmit(() => {

      const res = formRef.current?.submit()

      console.log(formState)
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
          problema: se pisan el onSubmit={} y el action={} en el mismo form
        </code>

        <h2 className='text-2xl font-bold tracking-wide'>useActionState + RHF</h2>
        <input className="input input-primary" type="text" name="title" {...register("title")} defaultValue={formState?.prevState?.title} />
        <p>{errors?.title?.message}</p>
        <p>{formState?.errors?.title}</p>
        <input className="input input-primary" type="text" name="content" {...register("content")} defaultValue={formState?.prevState?.content} />
        <p>{errors?.content?.message}</p>
        <p>{formState?.errors?.content}</p>
        <SubmitBtn />
        {isPending && <p>Enviando...</p>}
      </form>
    </>
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


