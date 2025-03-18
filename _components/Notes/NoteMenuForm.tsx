"use client"

import Link from "next/link";
import { NoteType } from "../../_lib/types/note.type";
import { EditSVG } from "../../_assets/EditSVG";
import DeleteNoteAction from "./DeleteNoteAction";

export default function NoteMenuForm({ note }: { note: NoteType }) {

  return (
    <div className='flex gap-2 items-center justify-center'>
      <Link href={`/note/edit?noteid=${note._id}`}><EditSVG /></Link>
      <DeleteNoteAction note={note} />
    </div>
  )
}



