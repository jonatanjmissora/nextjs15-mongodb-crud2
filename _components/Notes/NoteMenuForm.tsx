
import { NoteType } from "./NotesList";
import Link from "next/link";

export default function NoteMenuForm({ note }: { note: NoteType }) {


  return (
    <div>
      <Link className="btn btn-primary" href={`/note/edit?noteid=${note._id}`}>editar</Link>
    </div>
  )
}
