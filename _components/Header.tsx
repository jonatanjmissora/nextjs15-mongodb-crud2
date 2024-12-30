import Link from 'next/link'
import React from 'react'
import { logout } from '../_actions/user.actions'
import getUserFromCookie from '../_lib/utils/getUser'

export default async function Header() {

  const user = await getUserFromCookie()

  return (
    <div className="navbar flex justify-between bg-slate-900 px-4">
      <Link href={"/"} className="btn btn-ghost text-xl">K@to</Link>
      <nav>
        <Link href={"/01testSimpleClientAction"} className="btn btn-ghost">Client Action + Server</Link>
        <Link href={"/02testSimpleClientActionAndReactHookForm"} className="btn btn-ghost">Client Action + RHF</Link>
        <Link href={"/04testWithUseActionStateAndHook"} className="btn btn-ghost">Use Action State</Link>
        <Link href={"/04testWithUseActionStateAndHookAndModal"} className="btn btn-ghost">Use Action State + Modal</Link>
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
