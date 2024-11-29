"use client"

import Link from "next/link";
import { NoteType } from "../../_lib/types/note.type";
import { deleteNote } from "../../_actions/note.actions";
import toast from "react-hot-toast";
import SubmitBtn from "../SubmitBtn";

export default function NoteMenuForm({ note }: { note: string }) {

  const noteFix = JSON.parse(note.toString()) as NoteType

  const clientAction = async (formData: FormData) => {

    const res = await deleteNote(null, formData)
    if (res?.error) toast.error(res.error)
    else toast.success("Nota eliminada exitosamente")
  }

  return (
    <div className="flex gap-4">
      <Link className="btn btn-primary" href={`/note/edit?noteid=${noteFix._id}`}>editar</Link>
      <form action={clientAction}>
        <input className='hidden' type="text" name="noteid" defaultValue={noteFix._id.toString()} />
        <SubmitBtn text="eliminar" className={"btn-error"} />
      </form>
    </div>
  )
}
