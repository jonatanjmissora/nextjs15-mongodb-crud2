import Link from 'next/link';
import { NoteType } from '../../_lib/types/note.type';
import Note from './Note';
import NotesPagination from './NotesPagination';
import { getUserNotes } from '../../_lib/utils/getUserNotes';
import { sortedNotesByPin } from '../../_lib/utils/sortedNotes';
import PlusSVG from "../../_assets/PlusSVG"

export default async function NotesList({ user, page }: { user: NoteType, page: string }) {

  const notes = await getUserNotes(user._id) as NoteType[]
  const notesToShow = sortedNotesByPin(notes, +page) as NoteType[]

  return (
    <div className='flex-1 flex flex-col items-center justify-start w-full p-4 sm:w-3/4'>
      <div className="w-full py-8 flex justify-between items-center">
        <h2 className='text-xl 2xl:text-3xl font-semibold tracking-wider'>Listado de Notas</h2>
        <Link href={`/note/new?userid=${user._id}`} className='btn btn-primary'><PlusSVG /></Link>
      </div>
      <div className="w-full h-[60dvh] grid grid-cols-1 sm:grid-cols-3 gap-8">

        {notesToShow.map((note, index) =>
          <Note key={note._id.toString()} actualNote={JSON.stringify(note)} index={index} />
        )}

      </div>
      <NotesPagination totalNotes={notes.length} page={page} />
    </div>
  )
}
