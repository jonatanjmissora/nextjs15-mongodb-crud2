import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button className='btn btn-primary' type="submit" disabled={pending} >{pending ? "..." : "Confirmar"}</button>
  )
}
