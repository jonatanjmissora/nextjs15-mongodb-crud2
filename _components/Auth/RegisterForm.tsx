"use client"

import Link from 'next/link';
import { register } from '../../_actions/user.actions'
import { useActionState } from "react";

export default function RegisterForm() {

  const [formState, formAction, isPending] = useActionState(register, null);

  // console.log({formState})

  return (
    <form action={formAction} className='flex flex-col gap-4 w-[20rem]'>

      <h2 className='text-3xl font-semibold'>No tienes una cuenta ? Registrate</h2>
      <input autoComplete='off' name="username" type="text" placeholder="Usuario" className="input input-bordered w-full max-w-xs" defaultValue={formState?.prevState?.username} />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.username}</p>
      <input autoComplete='off' name="userpassword" type="password" placeholder="Contraseña" className="input input-bordered w-full max-w-xs" defaultValue={formState?.prevState?.userpassword} />
      <p className='text-orange-500 italic min-h-6'>{formState?.errors?.userpassword}</p>
      <button className='btn btn-primary tracking-wide font-semibold'>{isPending ? <span className="loading loading-spinner"></span> : "Registrar"}</button>

      <div className="w-full flex justify-end">
        <Link className='link link-primary' href="/">Ingresa</Link>
      </div>

    </form>
  )
}


