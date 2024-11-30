import { NoteType } from '../../_lib/types/note.type'
import NoteMenuForm from './NoteMenuForm'
import PinnedStar from './PinnedStar'

const cardColors = ["bg-[salmon]", "bg-[moccasin]", "bg-[plum]", "bg-[mediumSeaGreen]", "bg-[turquoise]", "bg-[tan]"]

export default function Note({actualNote, index}:{actualNote: string, index: number}) {

    const note = JSON.parse(actualNote) as NoteType

  return (
    <div className={`flex-1 border border-black flex flex-col justify-between items-center rounded-xl shadow-md text-black ${cardColors[index]}`}>
        <p className='text-2xl tracking-wide font-semibold py-2'>{note.title}</p>
        <p className='text-xl italic p-2 text-center'>{note.content}</p>
        <div className='w-full grid grid-cols-3 p-2'>
            <div></div>
            <PinnedStar noteId={note._id.toString()} notePin={note.pinned}/>
            <NoteMenuForm note={actualNote} />
        </div>
    </div>
  )
}



