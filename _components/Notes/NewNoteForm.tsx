"use client"

import Link from 'next/link';
import { useActionState } from "react";
import { createNote, createNote2 } from '../../_actions/note.actions';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NewNoteForm() {
  const [formState, formAction, isPending] = useActionState(createNote2, null);
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = searchParams?.get("userid")

  // const clientAction = async (formData: FormData) => {
  //   const res = await createNote(null, formData)
  //   console.log("client formState", res)
  //   if (formState?.success) {
  //     toast.success("Nota creada exitosamente")
  //     router.push("/")
  //   }
  // }

  console.log({ formState })

  return (
    <form action={formAction} className='flex flex-col gap-4 w-[20rem]'>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-3xl font-semibold'>Nota nueva</h2>
        <Link className='btn btn-primary' href={"/"}>Volver</Link>
      </div>
      <input autoComplete='off' name="title" type="text" placeholder="Titulo" className="input input-bordered w-full max-w-xs" defaultValue={formState?.prevState?.title} />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.title}</p>
      <textarea className="textarea textarea-bordered" placeholder="Contenido" name="content" defaultValue={formState?.prevState?.content} />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.content}</p>
      <input className='hidden' type="text" name="userid" defaultValue={userId} />
      <button className='btn btn-primary tracking-wide font-semibold'>{isPending ? <span className="loading loading-spinner"></span> : "Crear"}</button>
    </form>
  )
}
