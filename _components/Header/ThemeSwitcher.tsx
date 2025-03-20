"use client"

import { useTheme } from 'next-themes'
import SunSVG from '../../_assets/SunSVG'
import MoonSVG from '../../_assets/MoonSVG'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className='flex items-center justify-end gap-2 text-white hover:text-[var(--color-primary25)]' onClick={handleClick}>
      {
        theme === "light"

          ? <SunSVG className="size-5" />
          : <MoonSVG className="size-5" />
      }
      <span className='text-lg tracking-wider pb-1'>tema</span>
    </div>
  )
}

export default ThemeSwitcher