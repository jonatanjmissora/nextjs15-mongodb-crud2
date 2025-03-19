import Link from 'next/link';
import { NoteFixType, NoteType } from '../../_lib/types/note.type';
import Note from './Note';
import NotesPagination from './NotesPagination';
import { sortedNotesByPin } from '../../_lib/utils/sortedNotes';
import PlusSVG from "../../_assets/PlusSVG"
import { getCachedUserNotes } from '../../_actions/note.actions';

export default async function NotesList({ user, page }: { user: NoteType, page: string }) {

  const notes = await getCachedUserNotes(user._id) as NoteType[]
  const notesToShow = sortedNotesByPin(notes, +page) as NoteType[]

  return (
    <div className='flex-1 flex flex-col items-center justify-around w-full h-full sm:w-3/4 py-12 sm:py-0'>
      <div className="w-full py-4 flex justify-between items-center">
        <h2 className='text-xl 2xl:text-3xl font-semibold tracking-wider'>Listado de Notas</h2>
        <Link href={`/note/new`} className='btn btn-primary btn-square'><PlusSVG /></Link>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 2xl:gap-8 h-full">

        {notesToShow.map((note, index) => {

          const noteFixed = { ...note, _id: note._id.toString() } as NoteFixType
          return <Note key={note._id.toString()} note={noteFixed} />
        }
        )}

      </div>
      <NotesPagination totalNotes={notes.length} page={page} />
    </div>
  )
}
