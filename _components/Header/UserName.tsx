"use client"

import { useRef, useState } from "react"
import UserSVG from "../../_assets/UserSVG"
import LogoutModal from "./LogoutModal"
import ThemeSwitcher from "./ThemeSwitcher"
import PlusSVG from "../../_assets/PlusSVG"
import { NavLinks } from "../../_lib/constants/NavLinks"
import { usePathname } from "next/navigation"

export default function UserName({ username }: { username: string }) {

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const pathname = usePathname()

  return (
    <>
      <button className="p-2 sm:p-0" onClick={() => setShowMenu(prev => !prev)}>
        <UserSVG className="size-7 sm:size-5 2xl:size-7 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]" />
      </button>
      {
        showMenu &&
        <>

          <DesktopMenu username={username} setShowMenu={setShowMenu} pathname={pathname}/>
        
        </>
      }
    </>
  )
}

const DesktopMenu = ({ username, setShowMenu, pathname }: { username: string, setShowMenu: (value: boolean) => void, pathname: string }) => {

  const pathnameArray = pathname.split("/")
  const currentPath = pathnameArray[pathnameArray.length - 1]
  console.log(pathnameArray)

  return (
    <div className="modal-menu-container fixed inset-0 z-10 bg-[var(--color-primary)] rounded-lg shadow-lg">
      <div className="w-full flex justify-between items-center p-4 px-10 sm:px-8 2xl:px-10 gap-6">
        <p className="text-xl sm:text-xs 2xl:text-xl font-bold tracking-wider pb-1">Hola {username}</p>
        <button onClick={() => setShowMenu(false)}>
          <PlusSVG className="size-7 sm:size-5 2xl:size-7 rotate-45 hover:text-[var(--color-primary-hover)]" />
        </button>
      </div>

        <nav className="flex flex-col gap-8 sm:gap-6 2xl:gap-8 text-center items-center p-10 sm:p-8 2xl:p-10 border-b border-[#ffffff10] py-20">
          {
            NavLinks.map(link => 
            <div  key={link.text} className="w-full flex justify-end">
              <a className={`text-2xl sm:text-xl 2xl:text-2xl w-max pl-8 text-right hover:text-[var(--color-primary-hover)] ${currentPath === link.includes && "border-b border-[var(--white)]"}`} href={link.href}>{link.text}
              </a>
            </div> )
          }
        </nav>

      <div className="flex flex-col gap-8 sm:gap-6 2xl:gap-8 text-center items-end p-10 sm:p-8 2xl:p-10">
        <LogoutModal />
        <ThemeSwitcher />
      </div>
    </div>
  )
}