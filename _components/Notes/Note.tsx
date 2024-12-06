import { NoteType } from '../../_lib/types/note.type'
import NoteMenuForm from './NoteMenuForm'
import PinnedStar from './PinnedStar'

const cardColors = ["[salmon]", "[plum]", "[salmon]", "[plum]", "[salmon]", "[plum]"]

export default function Note({actualNote, index}:{actualNote: string, index: number}) {

    const note = JSON.parse(actualNote) as NoteType

  return (
    <div className={`flex-1 max-h-[30vh] border border-slate-700 flex flex-col justify-between items-center rounded-xl drop-shadow-lg text-gray-100 transition-all duration-500 bg-gradient-to-r from-[tan]/5 via-[tan]/10 to-${cardColors[index]}/60 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:scale-105`}>
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



