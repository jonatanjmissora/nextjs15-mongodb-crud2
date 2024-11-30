import { ObjectId } from 'mongodb'
import { getCollection } from '../../_lib/mongoConnect';
import Link from 'next/link';
import { UserType } from '../../_lib/types/user.types';
import { NoteType } from '../../_lib/types/note.type';
import { unstable_cache } from 'next/cache';
import Note from './Note';

const getUserNotes = unstable_cache(async (userId: ObjectId) => {
  const notesCollection = await getCollection("notes")
  return await notesCollection.find({ author: userId }).toArray()
},
  ["notes"],
  { revalidate: 60, tags: ["notes"] }
)

export default async function NotesList({ user }: { user: UserType }) {

  const notes = await getUserNotes(user._id) as NoteType[]

  return (
    <div className='flex flex-col items-center justify-start w-3/4'>
      <div className="w-full py-8 flex justify-between items-center">
        <h2 className='text-3xl font-semibold tracking-wider'>Listado de Notas</h2>
        <Link href={`/note/new?userid=${user._id}`} className='btn btn-primary'><PlusSVG /></Link>
      </div>
      <div className="w-full h-[60dvh] grid grid-cols-3 gap-8">

            {notes.map((note, index) =>
              <Note key={note._id.toString()} actualNote={JSON.stringify(note)} index={index}/>
            )}
          
      </div>
    </div>
  )
}

const PlusSVG = () => {
  return (
    <svg  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
  )
}
