"use client"

import { useRef } from "react"
import SubmitBtn from "./Notes/SubmitBtn"
import { logout } from "../_actions/user.actions"

export default function UserName({ username }: { username: string }) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="btn btn-primary" onClick={() => dialogRef.current?.showModal()}>
        {username}
      </button>

      <dialog ref={dialogRef} className="w-full h-full bg-transparent relative">
        <div className="rounded-lg bg-slate-800 w-max h-max p-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-center">

          <form action={logout} className="flex flex-col justify-center items-center gap-6">

            <span className="font-bold text-lg text-slate-100 z-10 tracking-widest text-left">¿ Seguro desea cerrar sesión ?</span>

            <div className="flex gap-4 w-full">
              <SubmitBtn />
              <button onClick={() => dialogRef.current.close()} type="button" className="flex-1 btn tracking-wider font-bold">No</button>
            </div>

          </form>

        </div>
      </dialog>
    </>
  )
}
