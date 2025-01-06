
import Link from 'next/link'
import { logout } from '../_actions/user.actions'
import getUserFromCookie from '../_lib/utils/getUser'
import HeaderLink from './HeaderLink'

const NavLinks = [
  { href: "/01ClientAndServerAction", text: "Client Action + Server Action" },
  { href: "/02RHFAndServerAction", text: "HFR + Server Action" },
  { href: "/03UseActionState", text: "useActionState" },
  { href: "/04UseActionStateAndRHF", text: "useActionState + RHF" },
  { href: "/05UseActionStateAndModal", text: "useActionState + Modal" },
  { href: "/06UseActionStateAndRHFVideo", text: "useActionState + RHF Video" },
]

export default async function Header() {

  const user = await getUserFromCookie()

  return (
    <div className="navbar flex justify-between text-slate-200 bg-slate-900 px-4">
      <Link href={"/"} className="btn btn-ghost text-xl">K@to</Link>
      <nav>
        {
          NavLinks.map((link, i) => (
            <HeaderLink key={i} href={link.href} text={link.text} />
          ))
        }
      </nav>
      <div className="flex-none">
        {
          user

          && <form action={logout}>
            <button className='btn btn-primary'>{user.username}</button>
          </form>

        }
      </div>
    </div>
  )
}
