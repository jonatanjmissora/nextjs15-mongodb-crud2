"use client"

import { useRef, useState } from "react"
import SubmitBtn from "../Notes/SubmitBtn"
import { logout } from "../../_actions/user.actions"
import UserSVG from "../../_assets/UserSVG"
import LogoutModal from "./LogoutModal"
import ThemeSwitcher from "./ThemeSwitcher"
import PlusSVG from "../../_assets/PlusSVG"

export default function UserName({ username }: { username: string }) {

  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <>
      <button className="p-2 sm:p-0" onClick={() => setShowMenu(prev => !prev)}>
        <UserSVG className="size-7 sm:size-5 2xl:size-7 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]" />
      </button>
      {
        showMenu &&
        <>

          <div className="modal-menu-container hidden sm:block fixed inset-0 z-10 bg-[var(--color-primary)] rounded-lg shadow-lg">
            <div className="w-full flex justify-between items-center p-4 px-10 sm:px-8 2xl:px-10 gap-6">
              <p className="text-xl sm:text-xs 2xl:text-xl font-bold tracking-wider pb-1">Hola {username}</p>
              <button onClick={() => setShowMenu(false)}>
                <PlusSVG className="size-7 sm:size-5 2xl:size-7 rotate-45 hover:text-[var(--color-primary-hover)]" />
              </button>
            </div>

            <div className="flex flex-col gap-8 sm:gap-6 2xl:gap-8 text-center items-end p-10 sm:p-8 2xl:p-10">
              <LogoutModal />
              <ThemeSwitcher />
            </div>
          </div>

          {/* <div className="modal-menu-container inset-0 z-10 bg-[var(--color-primary)] rounded-lg  shadow-lg fixed sm:hidden">
            <div className="w-full flex justify-between items-center p-4 px-10 sm:px-8 2xl:px-10 gap-6">
              <p className="text-xl sm:text-xs 2xl:text-xl font-bold tracking-wider pb-1">Movil {username}</p>
              <button onClick={() => setShowMenu(false)}>
                <PlusSVG className="size-7 sm:size-5 2xl:size-7 rotate-45 hover:text-[var(--color-primary-hover)]" />
              </button>
            </div>

            <div className="flex flex-col gap-8 sm:gap-6 2xl:gap-8 text-center items-end p-10 sm:p-8 2xl:p-10">
              <LogoutModal />
              <ThemeSwitcher />
            </div>
          </div> */}

        </>
      }
    </>
  )
}
