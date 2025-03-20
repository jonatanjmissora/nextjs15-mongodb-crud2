"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HeaderLink({ href, text }: { href: string, text: string }) {

  const pathname = usePathname()

  return (
    <Link href={href} className={`btn text-xl sm:text-xs 2xl:text-xl ${pathname === href ? "btn-ghost-active" : "btn-ghost"}`}>{text}</Link>
  )
}
