"use client"

import Link from 'next/link';
import { useActionState, useState } from "react";
import CloseEyeSVG from '../../_assets/CloseEyeSVG';
import OpenEyeSVG from '../../_assets/OpenEyeSVG';
import { register } from '../../_actions/user.actions';

export default function RegisterForm() {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formState, formAction, isPending] = useActionState(register, null);

  return (
    <div className='w-[90%] sm:w-[20rem] h-full flex justify-center items-center'>
      <form action={formAction} className='flex flex-col justify-center items-center gap-4 w-full sm:scale-75 2xl:scale-100'>

        <h2 className='text-xl font-semibold text-left w-full'>No tienes una cuenta ? Registrate</h2>
        <input
          className="input input-bordered w-full max-w-xs"
          autoComplete='off'
          name="username"
          type="text"
          placeholder="Usuario"
          defaultValue={formState?.prevState?.username} />
        <p className='text-orange-500 italic min-h-6'>{formState?.errors?.username}</p>

        <div className='relative flex items-center justify-center w-full'>

          <input
            className="input input-bordered w-full max-w-xs"
            autoComplete='off'
            name="userpassword"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            defaultValue={formState?.prevState?.userpassword} />

          <button className="p-2 absolute right-4" type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <CloseEyeSVG className='size-6 pt-1 text-slate-700' currentColor='currentColor' /> : <OpenEyeSVG className='size-6 text-slate-700' currentColor='currentColor' />}
          </button>
        </div>

        <p className='text-orange-500 italic min-h-6'>{formState?.errors?.userpassword}</p>

        <button className='btn btn-primary tracking-wide font-semibold w-full' type="submit">{isPending ? <span className="loading loading-spinner"></span> : "Registrar"}</button>

        <div className="w-full flex justify-end">
          <Link className='link' href="/">Ingresa</Link>
        </div>

      </form>
    </div>
  )
}


