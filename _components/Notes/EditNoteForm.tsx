"use client"

import Link from 'next/link';
import { editNote } from '../../_actions/note.actions';
import { NoteFixType } from '../../_lib/types/note.type';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubmitBtn from '../SubmitBtn';

type InputProps = {
  title: string;
  content: string;
}

const InitialInputs = {
  title: "",
  content: "",
}

export default function EditNoteForm({ note }: {
  note: NoteFixType
}) {
  const [errors, setErrors] = useState<InputProps>(InitialInputs)
  const [inputsValues, setInputsValues] = useState<InputProps>({ title: note.title, content: note.content })
  const router = useRouter()

  const clientAction = async (formData: FormData) => {

    const title = formData.get("title").toString()
    const content = formData.get("content").toString()
    setInputsValues({ title, content })

    const res = await editNote(null, formData)
    if (res.success) {
      toast.success("Nota editada exitosamente")
      router.push("/")
    }
    else {
      setErrors({ ...res.errors })
      setInputsValues({ ...res.prevState })
    }

  }
  return (
    <form action={clientAction} className='flex flex-col gap-4 w-[20rem]'>
      <div className='flex justify-between items-center py-4'>
        <h2 className='text-3xl font-semibold'>Editar Nota</h2>
        <Link className='btn btn-primary' href={"/"}>Volver</Link>
      </div>
      <input autoComplete='off' name="title" type="text" placeholder="Titulo" className="input input-bordered w-full max-w-xs" defaultValue={inputsValues.title} />
      <p className='text-orange-500 italic min-h-6'>{errors?.title}</p>
      <textarea className="textarea textarea-bordered" placeholder="Contenido" name="content" defaultValue={inputsValues.content} />
      <p className='text-orange-500 italic min-h-6'>{errors?.content}</p>
      <input className='hidden' type="text" name="note" defaultValue={JSON.stringify(note)} />
      <SubmitBtn text="editar" />
    </form>
  )
}
