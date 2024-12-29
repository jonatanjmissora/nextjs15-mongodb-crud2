import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
    const status = useFormStatus();
  return (
    <button  className='btn btn-primary'  type="submit" disabled={status.pending} >{"Crear"}</button>
  )
}
