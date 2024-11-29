"use client"

import Link from 'next/link';
import { useActionState, useState } from "react";
import { createNote, createNote2 } from '../../_actions/note.actions';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NewNoteForm() {
  // const [formState, formAction, isPending] = useActionState(createNote2, null);
  const [errors, setErrors] = useState<{title: string, content: string}>({title: "", content: ""})
  const [inputsValues, setInputsValues] = useState<>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = searchParams?.get("userid")

  const clientAction = async (formData: FormData) => {
    const res = await createNote2(null, formData)
    if (res.success) {
      toast.success("BIEN")
      router.push("/")
    }
    else {
      // colocar los errores donde corresponda
      // en un useState para tituloError, y para contentError
      const newErrors = {title: res?.errors?.title, content: res.errors.content}
      setErrors(newErrors)
    }

  }

  // console.log({ formState })

  return (
    <form action={clientAction} className='flex flex-col gap-4 w-[20rem]'>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-3xl font-semibold'>Nota nueva</h2>
        <Link className='btn btn-primary' href={"/"}>Volver</Link>
      </div>
      <input autoComplete='off' name="title" type="text" placeholder="Titulo" className="input input-bordered w-full max-w-xs" traer los prevState al defaultValue/>
      <p className='text-orange-500 italic min-h-6'>{errors?.title}</p>
      <textarea className="textarea textarea-bordered" placeholder="Contenido" name="content" />
      <p className='text-orange-500 italic min-h-6'>{errors?.content}</p>
      <input className='hidden' type="text" name="userid" defaultValue={userId} />
      <button className='btn btn-primary tracking-wide font-semibold'>Crear</button>
    </form>
  )
}
