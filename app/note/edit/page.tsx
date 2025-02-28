import { getNoteById } from '../../../_actions/note.actions'
import NoteForm from '../../../_components/Forms/NoteForm'
import { NoteFixType } from '../../../_lib/types/note.type'
import { TokenType } from '../../../_lib/types/user.types'
import getUserFromCookie from '../../../_lib/utils/getUser'

export default async function EditNotePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie() as TokenType
  if (!user) return

  const noteId = (await searchParams).noteid

  let note = await getNoteById(noteId)
  const noteFixed = { ...note, _id: note._id.toString() } as NoteFixType

  return (
    <div className="flex-1 flex justify-center items-center mx-auto w-[95%] h-full sm:w-3/4">
      <NoteForm userId={user._id} note={noteFixed} />
    </div>
  )
}
