import toast from 'react-hot-toast'
import { useLoginActionState } from './useFormHook'
import { useActionState, useEffect } from 'react'
import { addTodo2 } from './actions'

export default function FormServer({ inputValues, setShow }: { inputValues: { title: string, content: string }, setShow: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [formState, formAction, isPending] = useActionState(addTodo2, null)

  useEffect(() => {
    if(formState?.success) setShow(false)
  }, [formState])

  return (
    <div className="modal-box">

      <h3 className="font-bold text-lg">{`¿Confirmamos la creacion?`}</h3>
      <div className=" text-gray-500">
        <p>title: {inputValues.title}</p>
        <p>content: {inputValues.content}</p>
      </div>

      <div className="modal-action">
        <form action={formAction} >

          <input type="text" className="hidden" name="title" defaultValue={inputValues.title} />
          <input type="text" className="hidden" name="content" defaultValue={inputValues.content} />
          <button className='btn btn-primary w-[6rem] mx-6' disabled={isPending}>{isPending ? "..." : "Confirmar"}</button>
          <button onClick={() => setShow(false)} type="button" className="btn btn-error w-[6rem] mx-6">Cancelar</button>

        </form>
      </div>

      <p>{JSON.stringify(formState)}</p>
      <p>{isPending ? "TRUE" : "FALSE"}</p> 
    </div>
  )
}
