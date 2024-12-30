import { useLoginActionState } from './useFormHook'

export default function Modal({inputValues, setShow}: {inputValues: {title: string, content: string}, setShow: React.Dispatch<React.SetStateAction<boolean> >}) {

    const [formState, formAction, isPending] = useLoginActionState()
 
  return (
    <div className="modal-box">
        <div className=" text-gray-500">
        <p>title: {inputValues.title}</p>
        <p>content: {inputValues.content}</p>
        </div>
        <h3 className="font-bold text-lg">{`Confirmamos la creacion?`}</h3>
        <div className="modal-action">
        <form action={formAction} >
            <input type="text" className="hidden" name="title" defaultValue={inputValues.title}/>
            <input type="text" className="hidden" name="content" defaultValue={inputValues.content}/>
            <button className='btn btn-primary w-[6rem] mx-6' disabled={isPending}>{isPending ? "..." : "Confirmar"}</button>
            <button onClick={() => setShow(false)} type="button" className="btn btn-error w-[6rem] mx-6">Cancelar</button>
        </form>
        </div>
        <p>{JSON.stringify(formState)}</p>
        <p>{isPending ? "TRUE" : "FALSE"}</p>
    </div>
  )
}
