"use client"

import { ResType, useLoginActionState } from "./useFormHook"

export default function FormWithUseActionState() {

  const [formState, formAction, isPending] = useLoginActionState()

  return (
    <form action={formAction} className='flex gap-4 flex-col p-4 m-4 w-1/4'>
      
      <h2 className='text-2xl font-bold tracking-wide'>useActionState</h2>

      <Input formState={formState} label='title' />

      <Input formState={formState} label='content' />

      <button className='btn btn-primary' type="submit" disabled={isPending}>{isPending ? "..." : "Crear"}</button>

      <p>{formState?.success && "Todo enviado exitosamente"}</p>
      
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

