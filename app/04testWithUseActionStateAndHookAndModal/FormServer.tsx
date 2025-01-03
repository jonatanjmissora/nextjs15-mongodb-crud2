import { ResType } from './actions'

export default function FormServer({ inputValues, setShow, formState, formAction, isPending }: 
  { inputValues: { title: string, content: string}, 
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  formState: ResType, 
  formAction: (payload: FormData) => void, 
  isPending: boolean }) {

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
    </div>
  )
}
