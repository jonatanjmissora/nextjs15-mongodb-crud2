"use client"

import Link from 'next/link';
import { useActionState } from "react";
import { editNote } from '../../_actions/note.actions';
import { NoteFixType } from '../../_lib/types/note.type';
import toast from 'react-hot-toast';

export default function EditNoteForm({ note }: {
  note: NoteFixType
}) {
  const [formState, formAction, isPending] = useActionState(editNote, null);

  // const submitAction = async (formData: FormData) => {
  //   await formAction(formData)
  //   if (formState?.deletedCount === 0) toast.error("No se pudo editar la nota")
  //   else toast.success("Nota editada exitosamente")
  // }

  return (
    <form action={formAction} className='flex flex-col gap-4 w-[20rem]'>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-3xl font-semibold'>Editar Nota</h2>
        <Link className='btn btn-primary' href={"/"}>Volver</Link>
      </div>
      <input autoComplete='off' name="title" type="text" placeholder="Titulo" className="input input-bordered w-full max-w-xs" defaultValue={formState ? formState?.prevState?.title : note?.title} />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.title}</p>
      <textarea className="textarea textarea-bordered" placeholder="Contenido" name="content" defaultValue={formState ? formState?.prevState?.content : note?.content} />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.content}</p>
      <input className='hidden' type="text" name="note" defaultValue={JSON.stringify(note)} />
      <button className='btn btn-primary tracking-wide font-semibold'>{isPending ? <span className="loading loading-spinner"></span> : "Editar"}</button>
    </form>
  )
}
