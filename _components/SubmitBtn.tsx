import { useFormStatus } from "react-dom";

export default function SubmitBtn({ text, className }: { text: string, className?: string }) {

  const { pending } = useFormStatus()

  return (
    <button
      className={`btn btn-primary tracking-wide font-semibold ${className}`}
      disabled={pending}
      type="submit" >
      {pending ? <span className="loading loading-spinner"></span> : text}
    </button>

  )
}