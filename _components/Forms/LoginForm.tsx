"use client"

import Link from 'next/link';
import { login } from '../../_actions/user.actions'
import { useActionState, useState } from "react";
import CloseEyeSVG from '../../_assets/CloseEyeSVG';
import OpenEyeSVG from '../../_assets/OpenEyeSVG';

export default function LoginForm() {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formState, formAction, isPending] = useActionState(login, null);

  return (
    <div className='w-[20rem] h-full flex justify-center items-center'>

      <form action={formAction} className='flex flex-col gap-4 w-full'>

        <h2 className='text-xl font-semibold'>Ya tienes una cuenta ? Ingresa</h2>
        <input
          className="input input-bordered w-full max-w-xs"
          autoComplete='off'
          name="username"
          type="text"
          placeholder="Usuario"
          defaultValue={formState?.prevState?.username} />
        <p className='text-orange-500 italic min-h-6'>{formState?.errors.username}</p>
        <div className='relative flex items-center justify-end'>

          <input
            className="input input-bordered w-full max-w-xs"
            autoComplete='off'
            name="userpassword"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            defaultValue={formState?.prevState?.userpassword} />

          <button className="p-2 absolute right-4" type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <CloseEyeSVG className='size-6' currentColor='white' /> : <OpenEyeSVG className='size-6' currentColor='white' />}
          </button>
        </div>
        <p className='text-orange-500 italic min-h-6'>{formState?.errors.userpassword}</p>
        <button className='btn btn-primary tracking-wide font-semibold'>{isPending ? <span className="loading loading-spinner"></span> : "Ingresar"}</button>

        <div className="w-full flex justify-end">
          <Link className='link link' href="/register">Registrate</Link>
        </div>

      </form>
    </div>
  )
}
