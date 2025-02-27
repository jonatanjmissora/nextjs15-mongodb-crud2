import { NoteType } from '../../_lib/types/note.type'
import NoteMenuForm from './NoteMenuForm'
import PinnedStar from './PinnedStar'


export default function Note({ actualNote, index }: { actualNote: string, index: number }) {

  const note = JSON.parse(actualNote) as NoteType

  return (
    <div className="card text-gray-100">
      <div>
        <p className='text-2xl tracking-wide font-semibold py-2'>{note.title}</p>
        <p className='text-xl italic p-2 text-center'>{note.content}</p>
        <div className='w-full flex justify-around items-center'>
          <div className='hidden sm:block'></div>
          <PinnedStar noteId={note._id.toString()} notePin={note.pinned} />
          <NoteMenuForm note={actualNote} />
        </div>
      </div>
    </div>
  )
}



