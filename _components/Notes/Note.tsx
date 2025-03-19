import { NoteFixType, NoteType } from '../../_lib/types/note.type'
import NoteMenuForm from './NoteMenuForm'
import PinnedStar from './PinnedStar'


export default function Note({ note }: { note: NoteFixType }) {

  return (
    <div className="card flex-1">
      <div>
        <p className='text-2xl sm:text-base 2xl:text-2xl tracking-wide font-semibold py-2'>{note.title.toUpperCase()}</p>
        <p className='text-xl sm:text-base 2xl:text-xl italic p-2 text-center'>{note.content}</p>
        <div className='w-full flex justify-around items-center sm:scale-75 2xl:scale-100'>
          <div className='hidden sm:block'></div>
          <PinnedStar noteId={note._id.toString()} notePin={note.pinned} />
          <NoteMenuForm note={note} />
        </div>
      </div>
    </div>
  )
}



