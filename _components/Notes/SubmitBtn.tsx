import { useFormStatus } from "react-dom";

export default function SubmitBtn() {

  const { pending } = useFormStatus()

  return (
    <button
      className="flex-1 btn btn-primary tracking-wider font-bold text-xl"
      disabled={pending}
      type="submit" >
      {pending ? <span className="loading loading-spinner text-black"></span> : "Si"}
    </button>

  )
}

