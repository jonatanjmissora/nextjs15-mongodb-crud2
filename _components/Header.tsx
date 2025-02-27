
import Link from 'next/link'
import { logout } from '../_actions/user.actions'
import getUserFromCookie from '../_lib/utils/getUser'
import HeaderLink from './HeaderLink'

const NavLinks = [
  { href: "/", text: "Links" },
]

export default async function Header() {

  const user = await getUserFromCookie()

  return (
    <div className="navbar flex justify-between text-slate-200  px-4">
      <Link href={"/"} className="btn btn-ghost text-xl">K@to</Link>
      {user && (<> <nav>
        {
          NavLinks.map((link, i) => (
            <HeaderLink key={i} href={link.href} text={link.text} />
          ))
        }
      </nav>
        <div className="flex-none">
          <form action={logout}>
            <button className='btn btn-primary'>{user.username}</button>
          </form>
        </div></>)}
    </div>
  )
}
