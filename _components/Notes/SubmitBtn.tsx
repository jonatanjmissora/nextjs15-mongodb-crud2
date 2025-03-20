import { useFormStatus } from "react-dom";
import SpinnerSVG from "../../_assets/SpinnerSVG";

export default function SubmitBtn() {

  const { pending } = useFormStatus()

  return (
    <button
      className="flex-1 btn btn-primary tracking-wider font-bold text-xl sm:text-sm 2xl:text-xl"
      disabled={pending}
      type="submit" >
      {pending ? <SpinnerSVG className='size-7' /> : "Si"}
    </button>

  )
}

