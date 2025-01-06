"use client"

import { RegisterOptions, useForm, UseFormRegister, UseFormRegisterReturn, useFormState } from "react-hook-form"
import { loginSchema, LoginType } from "./login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useActionState, useRef } from "react"
import { onSubmitAction } from "./actions"
import { z } from "zod"

export default function FormClient() {

  // const [inputValues, setInputValues] = useState({ title: "", content: "" })
  // const [show, setShow] = useState(false)
  // const formRef = useRef<HTMLFormElement>(null)
  // const router = useRouter()

  const [state, formAction] = useActionState(onSubmitAction, {
    message: "",
  });
  const form = useForm<z.output<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      ...(state?.fields ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="space-y-8"
      action={formAction}
      onSubmit={(evt) => {
        evt.preventDefault();
        form.handleSubmit(() => {
          formAction(new FormData(formRef.current!));
        })(evt);
      }}
    >

      <Input label={"first"} value={""} error={form.formState?.errors?.first?.message} register={form.register} />
      <Input label={"last"} value={""} error={form.formState?.errors?.last?.message} register={form.register} />
      <Input label={"email"} value={""} error={form.formState?.errors?.email?.message} register={form.register} />

      <button className="btn btn-info" type="submit">Submit</button>

    </form>
  )
}

const Input = ({ label, value, error, register, className }: { label: string, value: string, error: string, register: UseFormRegister<{ [key: string]: string }>, className?: string }) => {
  return (
    <>
      <input
        className={`input input-primary text-slate-600 text-center ${error && 'input-error'} ${className}`}
        type="text"
        name={label}
        defaultValue={value}
        placeholder={`... ${label} ...`}
        {...register(`${label}`)}
      />
      <p>{error && error}</p>
    </>
  )
}

// resetear inputValues cuando todo esta bien
// dar un aviso con toast

// no resetear inputValues si hay error
