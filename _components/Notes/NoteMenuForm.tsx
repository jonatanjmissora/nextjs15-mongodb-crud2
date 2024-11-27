
import { NoteType } from "./NotesList";
import Link from "next/link";

export default function NoteMenuForm({ note }: { note: NoteType }) {


  return (
    <div>
      <Link className="btn btn-primary" href={`/${note._id}/edit-note`}>editar</Link>
    </div>
  )
}
