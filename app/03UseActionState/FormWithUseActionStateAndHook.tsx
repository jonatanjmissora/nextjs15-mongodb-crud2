"use client"

import { useLoginActionState } from "./useFormHook"

export default function FormWithUseActionState() {

  const [formState, formAction, isPending] = useLoginActionState()

  return (
    <form action={formAction} className='flex gap-4 flex-col p-4 m-4 w-1/4'>

      <code>useActionState<br />
        NO utlizo RHF<br />
      </code>

      <h2 className='text-2xl font-bold tracking-wide'>useActionState 👍</h2>

      <Input label='title' value={formState?.prevState?.title} error={formState?.errors?.title} />

      <Input label='content' value={formState?.prevState?.content} error={formState?.errors?.content} />

      <button className='btn btn-primary' type="submit" disabled={isPending}>{isPending ? "..." : "Crear"}</button>

      {<p className={`${formState?.success ? "text-green-700" : "text-red-700"}`}>{formState?.server && formState?.server}</p>}

    </form>
  )
}

const Input = ({ label, value, error }: { label: string, value: string, error: string }) => {
  return (
    <>
      <input
        className={`input input-primary text-center ${error && 'input-error'}`}
        type="text"
        name={label}
        defaultValue={value}
        placeholder={`... ${label} ...`}
      />
      <p>{error && error}</p>
    </>
  )
}

