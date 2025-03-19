import { useRef } from "react"
import { logout } from "../../_actions/user.actions"
import SubmitBtn from "../Notes/SubmitBtn"

export default function LogoutModal() {

  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="text-lg tracking-wider" onClick={() => dialogRef.current?.showModal()}>
        cerrar sesión
      </button>

      <dialog ref={dialogRef} className="w-full h-full bg-transparent relative">
        <div className="rounded-lg bg-slate-800 w-max h-max p-20 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-center">

          <form action={logout} className="flex flex-col justify-center items-center gap-12">

            <span className="font-bold text-2xl text-slate-100 z-10 tracking-widest text-left">¿ Seguro desea cerrar sesión ?</span>

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
