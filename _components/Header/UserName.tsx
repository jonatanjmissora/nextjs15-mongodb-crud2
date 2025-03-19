"use client"

import { useRef, useState } from "react"
import SubmitBtn from "../Notes/SubmitBtn"
import { logout } from "../../_actions/user.actions"
import UserSVG from "../../_assets/UserSVG"
import LogoutModal from "./LogoutModal"
import ThemeSwitcher from "./ThemeSwitcher"

export default function UserName({ username }: { username: string }) {

  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setShowMenu(prev => !prev)}>
        <UserSVG className="size-7 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]" />
      </button>
      {
        showMenu &&
        <div className="absolute z-10 top-16 right-3 bg-gray-700 rounded-lg p-10 shadow-lg flex flex-col gap-8 text-center items-end">
          <p className="text-xl font-bold tracking-wider">Hola {username}</p>
          <LogoutModal />
          <ThemeSwitcher />
        </div>
      }
    </>
  )
}
