"use client"

import Link from 'next/link';
import { login } from '../../_actions/user.actions'
import { useActionState } from "react";

export default function LoginForm() {

  const [formState, formAction, isPending] = useActionState(login, null);

  return (
    <div className='w-[20rem] h-full flex justify-center items-center'>

      <form action={formAction} className='flex flex-col gap-4 w-full'>

        <h2 className='text-3xl font-semibold'>Ya tienes una cuenta ? Ingresa</h2>
        <input autoComplete='off' name="username" type="text" placeholder="Usuario" className="input input-bordered w-full max-w-xs" defaultValue={formState?.prevState?.username} />
        <p className='text-orange-500 italic min-h-6'>{formState?.errors.username}</p>
        <input autoComplete='off' name="userpassword" type="password" placeholder="Contraseña" className="input input-bordered w-full max-w-xs" defaultValue={formState?.prevState?.userpassword} />
        <p className='text-orange-500 italic min-h-6'>{formState?.errors.userpassword}</p>
        <button className='btn btn-primary tracking-wide font-semibold'>{isPending ? <span className="loading loading-spinner"></span> : "Ingresar"}</button>

        <div className="w-full flex justify-end">
          <Link className='link link-primary' href="/register">Registrate</Link>
        </div>

      </form>
    </div>
  )
}
