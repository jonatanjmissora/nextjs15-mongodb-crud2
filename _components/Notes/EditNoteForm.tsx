"use client"

import Link from 'next/link';
import { useActionState } from "react";
import { editNote } from '../../_actions/note.actions';
import { NoteType } from './NotesList';

export default function EditNoteForm({noteId, title, content, userId}: {
  noteId: string, title: string, content: string, userId: string
}) {
  const [formState, formAction, isPending] = useActionState(editNote, null);
  const fff = async (formData: FormData) => {
    const inputTitle = formData.get("title").toString()
    const inputContent = formData.get("content").toString()
    const inputUserId = formData.get("userid").toString()

    if(title === inputTitle && content === inputContent) return

    await formAction(formData)
  }

  return (
    <form action={fff} className='flex flex-col gap-4 w-[20rem]'>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-3xl font-semibold'>Editar Nota</h2>
        <Link className='btn btn-primary' href={"/"}>Volver</Link>
      </div>
      <input autoComplete='off' name="title" type="text" placeholder="Titulo" className="input input-bordered w-full max-w-xs" defaultValue={title} />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.title}</p>
      <textarea className="textarea textarea-bordered" placeholder="Contenido" name="content" defaultValue={content} />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors.content}</p>
      <input className='hidden' type="text" name="userid" defaultValue={userId} />
      <button className='btn btn-primary tracking-wide font-semibold'>{isPending ? <span className="loading loading-spinner"></span> : "Editar"}</button>
    </form>
  )
}
