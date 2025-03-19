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
        className="input max-w-xs text-xl py-3"
        defaultValue={formState?.prevState?.title || note?.title || ""}
      />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.title}</p>

      <textarea
        className="input text-xl py-3"
        placeholder="Contenido"
        name="content"
        defaultValue={formState?.prevState?.content || note?.content || ""}
      />

      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.content}</p>

      <button
        className={`btn btn-primary text-xl py-3 tracking-wide font-semibold`}
        disabled={isPending}
        type="submit" >
        {isPending ? <span className="loading loading-spinner text-black"></span> : note?._id ? "editar" : "crear"}
      </button>
    </form>
  )
}
