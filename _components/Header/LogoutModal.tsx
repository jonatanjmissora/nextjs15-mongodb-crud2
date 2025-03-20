import { useRef } from "react"
import { logout } from "../../_actions/user.actions"
import SubmitBtn from "../Notes/SubmitBtn"

export default function LogoutModal() {

  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="text-lg sm:text-xs 2xl:text-lg tracking-wider hover:text-[var(--color-primary25)]" onClick={() => dialogRef.current?.showModal()}>
        cerrar sesión
      </button>

      <dialog ref={dialogRef} className="w-full h-full bg-transparent relative">
        <div className="modal-container rounded-lg bg-[var(--color-primary25)] w-[97%] sm:w-max h-max p-10 sm:p-10 2xl:p-20 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-center">

          <form action={logout} className="flex flex-col justify-center items-center gap-10 sm:gap-6 2xl:gap-10">

            <span className="font-bold text-xl sm:text-sm 2xl:text-xl text-[var(--black)] z-10 tracking-widest text-left">¿ Seguro desea cerrar sesión ?</span>

            <div className="flex gap-4 w-full">
              <SubmitBtn />
              <button onClick={() => dialogRef.current.close()} type="button" className="flex-1 btn btn-secondary tracking-wider font-bold text-xl sm:text-sm 2xl:text-xl">No</button>
            </div>

          </form>

        </div>
      </dialog>
    </>
  )
}
