"use client"

import { useForm, UseFormRegister } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition, useActionState, useRef } from "react"
import { todoSchema, TodoType } from "./todo.schema"
import { useTodoActionState } from "./useFormHook"

export default function FormClient() {

  const formRef = useRef<HTMLFormElement>(null);
  const { register, reset, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const [formState, formAction, isPending] = useTodoActionState(reset);
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    handleSubmit(() => {
      startTransition(() => formAction(new FormData(formRef.current!)))
    })(evt);
  }

  return (
    <form
      ref={formRef}
      className="flex gap-4 flex-col p-4 m-4 w-1/4"
      action={formAction}
      onSubmit={onSubmit}
    >
      <h2 className='text-2xl font-bold tracking-wide'>useActionState + RHF 👍</h2>

      <Input label={"title"} value={""} error={errors?.title?.message} register={register} />
      <Input label={"content"} value={""} error={errors?.content?.message} register={register} />

      <button className="btn btn-info" disabled={isPending} type="submit">Submit</button>

      {
        !formState?.success
          ? <div className="text-red-500">{formState?.message}</div>
          : <div className="text-green-500">{formState?.message}</div>
      }

    </form>
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

// resetear inputValues cuando todo esta bien
// dar un aviso con toast

// no resetear inputValues si hay error
