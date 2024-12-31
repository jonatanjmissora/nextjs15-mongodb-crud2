
import Link from 'next/link'
import { logout } from '../_actions/user.actions'
import getUserFromCookie from '../_lib/utils/getUser'
import HeaderLink from './HeaderLink'

const NavLinks = [
  { href: "/01testSimpleClientAction", text: "Client Action + Server" },
  { href: "/02testSimpleClientActionAndReactHookForm", text: "Client Action + RHF" },
  { href: "/04testWithUseActionStateAndHook", text: "Use Action State" },
  { href: "/04testWithUseActionStateAndHookAndModal", text: "Use Action State + Modal" },
]

export default async function Header() {

  const user = await getUserFromCookie()
  
  return (
    <div className="navbar flex justify-between bg-slate-900 px-4">
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
