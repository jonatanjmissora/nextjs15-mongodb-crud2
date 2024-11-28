import { ObjectId } from 'mongodb'
import React from 'react'
import { getCollection } from '../../_lib/mongoConnect';
import Link from 'next/link';
import NoteMenuForm from './NoteMenuForm';
import { UserType } from '../../_lib/types/user.types';
import { NoteType } from '../../_lib/types/note.type';

const getUserNotes = async (userId: ObjectId) => {
  const notesCollection = await getCollection("notes")
  return await notesCollection.find({ author: userId }).toArray()
}

export default async function NotesList({ user }: { user: UserType }) {

  const notes = await getUserNotes(user._id) as NoteType[]

  return (
    <div className='flex flex-col items-center justify-start w-1/2'>
      <div className="w-full py-8 flex justify-between items-center">
        <h2 className='text-3xl font-semibold tracking-wider'>Listado de Notas</h2>
        <Link href={`/note/new?userid=${user._id}`} className='btn btn-primary'>+</Link>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Titulo</th>
              <th>Contenido</th>
              <th>favorito</th>
              <th>acciones</th>
            </tr>
          </thead>
          <tbody>

            {notes.map((note, index) =>

              <tr key={index} className='hover'>
                <th>{index + 1}</th>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>{note.pinned ? "true" : "false"}</td>
                <td>
                  <NoteMenuForm note={JSON.stringify(note)} />
                </td>
              </tr>

            )}

          </tbody>
        </table>
      </div>
    </div>
  )
}
