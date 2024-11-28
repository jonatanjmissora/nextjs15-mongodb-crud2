import { getNoteById } from '../../../_actions/note.actions'
import EditNoteForm from '../../../_components/Notes/EditNoteForm'
import { NoteType } from '../../../_components/Notes/NotesList'

export default async function EditNotePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

    const noteId = searchParams?.noteid

    const note = await getNoteById(noteId) as NoteType

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <EditNoteForm noteId={note._id.toString()} title={note.title} content={note.content} userId={note.author.toString()}/>
    </div>
  )
}
