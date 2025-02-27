"use client"

import Link from "next/link";
import { NoteType } from "../../_lib/types/note.type";
import { deleteNote } from "../../_actions/note.actions";
import toast from "react-hot-toast";
import DeleteNoteBtn from "./DeleteNoteBtn";

export default function NoteMenuForm({ note }: { note: string }) {

  const noteFix = JSON.parse(note.toString()) as NoteType

  const clientAction = async (formData: FormData) => {
    const res = await deleteNote(null, formData)
    if (res?.error) toast.error(res.error)
    else toast.success("Nota eliminada exitosamente")
  }

  return (
    <div className='flex gap-2 items-center justify-center'>
      <Link href={`/note/edit?noteid=${noteFix._id}`}><EditSVG /></Link>
      <form action={clientAction} className="flex justify-center items-center">
        <input className='hidden' type="text" name="noteid" defaultValue={noteFix._id.toString()} />
        <DeleteNoteBtn />
      </form>
    </div>
  )
}


const EditSVG = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
  )
}

