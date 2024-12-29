"use client"

import { useRef } from "react"
import { ResType, useLoginActionState } from "./useFormHook"

export default function FormWithUseActionState() {

  const formRef = useRef<HTMLFormElement>(null)
  const [formState, formAction, isPending] = useLoginActionState()

  return (
    <form ref={formRef} action={formAction} className='flex gap-4 flex-col p-4 m-4 w-1/4'>
      <div className="text-xs text-gray-500">
        <p>success: {formState?.success ? "true" : "false"}</p>
        <p>prevState: {JSON.stringify(formState?.prevState)}</p>
        <p>errors: {JSON.stringify(formState?.errors)}</p>
      </div>
      <h2 className='text-2xl font-bold tracking-wide'>useActionState</h2>

      <Input formState={formState} label='title' />

      <Input formState={formState} label='content' />

      <button className='btn btn-primary' type="submit" disabled={isPending}>{isPending ? "..." : "Crear"}</button>
    </form>
  )
}

const Input = ({formState, label}: {formState: ResType, label: string}) => {
  return (
    <>
      <input 
        className="input input-primary text-center" 
        type="text" 
        name={label} 
        defaultValue={formState?.prevState?.[label]}
        placeholder={`... ${label} ...`}
      />
      <p>{formState?.errors?.[label] && formState?.errors?.[label]}</p>
    </>
  )
}

