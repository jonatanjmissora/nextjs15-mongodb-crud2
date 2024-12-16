"use client"

import { useActionState, useState } from "react";
import { NoteFixType } from "../../_lib/types/note.type";
import Link from "next/link";
import { createNote, editNote } from "../../_actions/note.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { noteSchema } from "../../_lib/schema/schema.note";

type InputProps = {
  title: string;
  content: string;
}

const InitialInputs = {
  title: "",
  content: "",
}

export default function NoteForm({ userId, note }: { userId?: string, note?: NoteFixType }) {

  const isNewNote = userId ? true : false
  const router = useRouter()
  const [errors, setErrors] = useState<InputProps>(InitialInputs)
  const [inputsValues, setInputsValues] = useState<InputProps>({ title: note?.title || "", content: note?.content || "" })
  const [formState, formAction, isPending] = useActionState(async (prevState, formData: FormData) => {
    setErrors({ title: "", content: "" })
    const { title, content, userid } = Object.fromEntries(formData.entries())

    if (!isNewNote && title === note.title && content === note.content) return

    const newNote = {
      title: title.toString(),
      content: content.toString(),
      author: isNewNote ? userid as string : note.author,
      pinned: false,
    }
    // client validation
    const { success, data, error } = noteSchema.safeParse(newNote)
    if (!success) {
      const { title: titleError, content: contentError } = error.flatten().fieldErrors
      setErrors({ title: titleError ? titleError[0] : "", content: contentError ? contentError[0] : "" })
      setInputsValues({ title: newNote.title, content: newNote.content })
      toast.error("Error en el cliente")
      return {
        success: false,
        prevState: newNote,
      }
    }

    const res = isNewNote
      ? await createNote(data)
      : await editNote(note._id, data)

    console.log({ res })

    if (res?.success) {
      toast.success(`Nota ${isNewNote ? "creada" : "editada"} exitosamente`)
      router.push("/")
    }
    else {
      setErrors({ ...res.errors })
    }

  }, null)

  return (
    <form action={formAction} className='flex flex-col gap-4 w-[20rem]'>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-3xl font-semibold'>{isNewNote ? "Crear" : "Editar"} Nota</h2>
        <Link className='btn btn-primary' href={"/"}>Volver</Link>
      </div>
      <input autoComplete='off' name="title" type="text" placeholder="Titulo" className="input input-bordered w-full max-w-xs" defaultValue={inputsValues.title} />
      <p className='text-orange-500 italic min-h-6'>{errors?.title}</p>
      <textarea className="textarea textarea-bordered" placeholder="Contenido" name="content" defaultValue={inputsValues.content} />
      <p className='text-orange-500 italic min-h-6'>{errors?.content}</p>
      <input className='hidden' type="text" name="note" defaultValue={JSON.stringify(note)} />
      <input className='hidden' type="text" name="userid" defaultValue={userId} />

      <button
        className={`btn btn-primary tracking-wide font-semibold`}
        disabled={isPending}
        type="submit" >
        {isPending ? <span className="loading loading-spinner"></span> : isNewNote ? "crear" : "editar"}
      </button>
    </form>
  )
}
