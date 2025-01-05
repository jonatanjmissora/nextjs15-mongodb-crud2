"use client"

import { useState } from "react"
import { useLoginActionState } from "./useFormHook"

export default function FormClient() {

  const [inputValues, setInputValues] = useState({title: "", content: ""})
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [formState, formAction, isPending] = useLoginActionState(setShowConfirm)

  //hacer aca el RHF
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const title = form.title.value as string
    const content = form.content.value as string
    setShowConfirm(prev => !prev)
    setInputValues({title, content})
  }
  
  return (
    <>
      {
        showConfirm 
        ? (
          <form action={formAction} className='flex gap-4 flex-col p-4 m-4 w-1/4'>
            <p>{JSON.stringify(inputValues)}</p>
            <Input label='title' value={inputValues.title} error={formState?.errors?.title} />
            <Input label='content' value={inputValues.content} error={formState?.errors?.content} />

            <button type="submit" className="btn btn-primary" disabled={isPending}>Crear</button>
            <button type="button" className="btn btn-error" onClick={() => setShowConfirm(prev => !prev)}>Cancelar</button>

          </form>
        )
        : (
          <form onSubmit={onSubmit}  className='flex gap-4 flex-col p-4 m-4 w-1/4'>
      
            <h2 className='text-2xl font-bold tracking-wide'>useActionState 👍</h2>
      
            <Input label='title' value={formState?.prevState?.title} error={formState?.errors?.title} />
      
            <Input label='content' value={formState?.prevState?.content} error={formState?.errors?.content} />
      
            <button type="submit" className="btn btn-primary" >Crear</button>

            {<p className={`${formState?.success ? "text-green-700" : "text-red-700"}`}>{formState?.server && formState?.server}</p>}
          </form>
        )
      }
    </>
  )
}

const Input = ({ label, value, error }: { label: string, value: string, error: string }) => {
  return (
    <>
      <input
        className={`input input-primary text-slate-600 text-center ${error && 'input-error'}`}
        type="text"
        name={label}
        defaultValue={value}
        placeholder={`... ${label} ...`}
      />
      <p>{error && error}</p>
    </>
  )
}

//ahora si puedo probar de verificar con RHF
//hacer los componentes de cada Formulario