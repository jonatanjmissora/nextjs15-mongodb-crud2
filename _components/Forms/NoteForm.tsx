"use client"

import { NoteFixType } from "../../_lib/types/note.type";
import Link from "next/link";
import useFormState from "../../_lib/hook/useFormState";

export default function NoteForm({ userId, note }: { userId: string, note?: NoteFixType }) {

  const { formState, formAction, isPending } = useFormState({ userId, note })

  return (
    <form action={formAction} className='flex flex-col gap-4 w-[20rem]'>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-3xl font-semibold'>{note?._id ? "Editar" : "Crear"} Nota</h2>
        <Link className='btn btn-primary' href={"/"}>Volver</Link>
      </div>
      <input
        autoComplete='off'
        name="title"
        type="text"
        placeholder="Titulo"
        className="input input-bordered w-full max-w-xs"
        defaultValue={formState?.prevState?.title || note?.title || ""}
      />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.title}</p>

      <textarea
        className="textarea textarea-bordered text-slate-700 text-center"
        placeholder="Contenido"
        name="content"
        defaultValue={formState?.prevState?.content || note?.content || ""}
      />

      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.content}</p>

      <button
        className={`btn btn-primary tracking-wide font-semibold`}
        disabled={isPending}
        type="submit" >
        {isPending ? <span className="loading loading-spinner"></span> : note?._id ? "editar" : "crear"}
      </button>
    </form>
  )
}
