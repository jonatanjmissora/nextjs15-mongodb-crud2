"use client"

import Link from "next/link";
import { NoteType } from "../../_lib/types/note.type";
import { deleteNote } from "../../_actions/note.actions";
import toast from "react-hot-toast";
import DeleteNoteBtn from "./DeleteNoteBtn";
import { EditSVG } from "../../_assets/EditSVG";

export default function NoteMenuForm({ note }: { note: string }) {

  const noteFix = JSON.parse(note.toString()) as NoteType

  const formAction = async (formData: FormData) => {
    const res = await deleteNote(noteFix.author.toString(), noteFix._id.toString())
    if (res?.error) toast.error(res.error)
    else toast.success("Nota eliminada exitosamente")
  }

  return (
    <div className='flex gap-2 items-center justify-center'>
      <Link href={`/note/edit?noteid=${noteFix._id}`}><EditSVG /></Link>
      <form action={formAction} className="flex justify-center items-center">
        <input className='hidden' type="text" name="noteid" defaultValue={noteFix._id.toString()} />
        <DeleteNoteBtn />
      </form>
    </div>
  )
}



