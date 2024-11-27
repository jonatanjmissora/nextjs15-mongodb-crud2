import Link from 'next/link'
import React from 'react'
import { logout } from '../_actions/user.actions'
import getUserFromCookie from '../_lib/utils/getUser'

export default async function Header() {

  const user = await getUserFromCookie()

  return (
    <div className="navbar bg-base-100 px-4">
  <div className="flex-1">
    <Link href={"/"} className="btn btn-ghost text-xl">K@to</Link>
  </div>
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
