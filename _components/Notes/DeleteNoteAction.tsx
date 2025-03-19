"use client"

import toast from "react-hot-toast";
import { deleteNote } from "../../_actions/note.actions";
import TrashSVG from "../../_assets/TrashSVG";
import { useRef } from "react";
import SubmitBtn from "./SubmitBtn";
import { NoteType } from "../../_lib/types/note.type";

export default function DeleteNoteAction({ note }: { note: NoteType }) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const formAction = async () => {
    const res = await deleteNote(note.author.toString(), note._id.toString())
    if (res?.error) toast.error(res.error)
    else toast.success("Nota eliminada exitosamente")
  }

  return (
    <>
      <button className="" onClick={() => dialogRef.current?.showModal()}>
        <TrashSVG className="size-5" />
      </button>

      <dialog ref={dialogRef} className="w-full h-full bg-transparent relative">
        <div className="rounded-lg bg-slate-800 w-max h-max p-20 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-center">

          <form action={formAction} className="flex flex-col justify-center items-center gap-12">

            <span className="font-bold text-2xl text-slate-100 z-10 tracking-widest text-left">¿ Seguro desea eliminar la carta ?</span>

            <div className="flex gap-4 w-full">
              <SubmitBtn />
              <button onClick={() => dialogRef.current.close()} type="button" className="flex-1 btn btn-secondary tracking-wider font-bold text-xl">No</button>
            </div>

          </form>

        </div>
      </dialog>
    </>

  )
}