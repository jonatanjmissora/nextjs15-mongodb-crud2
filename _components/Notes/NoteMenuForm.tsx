"use client"

import Link from "next/link";
import { useActionState } from "react";
import { NoteType } from "../../_lib/types/note.type";
import { deleteNote } from "../../_actions/note.actions";
import toast from "react-hot-toast";

export default function NoteMenuForm({ note }: { note: string }) {

  const [formState, formAction, isPending] = useActionState(deleteNote, null);

  const noteFix = JSON.parse(note.toString()) as NoteType

  const submitAction = async (formData: FormData) => {
    await formAction(formData)
    console.log({ formState })
    if (formState?.deletedCount === 0) toast.error("No se pudo elimiar la nota")
    else toast.success("Nota eliminada exitosamente")
    mal
  }

  return (
    <div className="flex gap-4">
      <Link className="btn btn-primary" href={`/note/edit?noteid=${noteFix._id}`}>editar</Link>
      <form action={submitAction}>
        <input className='hidden' type="text" name="noteid" defaultValue={noteFix._id.toString()} />
        <button className="btn btn-error" type="submit">{isPending ? <span className="loading loading-spinner"></span> : "eliminar"}</button>
      </form>
    </div>
  )
}
