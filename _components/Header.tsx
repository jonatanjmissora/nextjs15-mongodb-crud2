
import Link from 'next/link'
import getUserFromCookie from '../_lib/utils/getUser'
import HeaderLink from './HeaderLink'
import UserName from './UserName'

const NavLinks = [
  { href: "/", text: "Links" },
]

export default async function Header() {

  const user = await getUserFromCookie()

  return (
    <div className="flex justify-between items-center text-slate-200 px-12 p-4">
      <Link href={"/"} className="btn btn-ghost text-xl">K@to</Link>
      {
        user &&
        (
          <>
            <nav>
              {
                NavLinks.map((link, i) => (
                  <HeaderLink key={i} href={link.href} text={link.text} />
                ))
              }
            </nav>

            <UserName username={user.username} />

          </>
        )
      }
    </div>
  )
}
