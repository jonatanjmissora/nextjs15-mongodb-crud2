import { getNoteById } from '../../../_actions/note.actions'
import EditNoteForm from '../../../_components/Notes/EditNoteForm'
import { NoteFixType } from '../../../_lib/types/note.type'

export default async function EditNotePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const noteId = (await searchParams).noteid

  let note = await getNoteById(noteId)
  const noteFixed = { ...note, _id: note._id.toString() } as NoteFixType

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <EditNoteForm note={noteFixed} />
    </div>
  )
}
