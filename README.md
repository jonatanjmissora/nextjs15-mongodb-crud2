
![alt text](/public/preview-desk.webp "preview image repository")
![alt text](/public/preview-mobil.webp "preview image repository")
# Info:
Probamos un CRUD con conexion a mongoDB. Server actions. 
      
# Utilizamos:
-  utilizamos mongodb package para la conexion.
-  zod como validacion y tipo.
-  toast para mostrar resultado.
-  useState para mostrar errores o conservar los valores del input luego de llamar a la accion del form.
-  React Hook Form.
-  useActionState.

****************************
01 - Simple Action form
==========================

```javascript
        const [inputFields, ...] = useState()\
        const [errors, ...] = useState()\
        const [serverResponse, ...] = useState()

        const formAction = async(formData: FormData) => {

        const title = formData.get("title") as string\
        const content = formData.get("content") as string\
        setInputFields({ title, content })\
        const newTodo = { title, content }

        //client validation\
        const { success, data, error } = todoSchema.safeParse(newTodo)\
        if (!success) {\
            const { title: titleError, content: contentError } = error.flatten().fieldErrors\
            // aca coloco en el useState `errors` y muestro en toast\
        }

        //server action and validation
        const serverResponse = await addTodo(data)
        if (!serverResponse.success) {
            // aca coloco en el useState `serverResponse` y muestro en toast
        }

        //si todo salio bien, toast, muestro `serverResponse` y reset de `inputFields`

        }

        return (
                <form action={formAction}>
                    <Input label="title" defaultValue={inputFields.title} error={errors.title} />
                    <SubmitBtn>   // useFormState
                    {
                        serverResponse?.message ...
                    }
                </form>
        )
```

*************************
02 - RHF + ServerAction
===========================

```javascript
        const [serverResponse, ...] = useState()
        const {...} = useForm<TodoType>({ resolver: zodResolver(todoSchema) })

        const onSubmit: SubmitHandler<TodoType> = async (data) => {

        // la validacion del cliente la hace RHF + zod

        setServerResponse({ success: false, message: "" })
        const response = await addTodo(data)
        if (!response.success) {
          toast.error("Error en el servidor")
        }
        else {
          toast.success("Todo creado exitosamente")
          reset()
        }
        setServerResponse(response)
      }

      return (
        <form onSubmit={handleSubmit(onSubmit)} >
          <InputRHF label={"title"} error={errors?.title?.message || ""} register={register} />
          <button ... isSubmitting>
          {
            serverResponse?.message ...
          }
        </form>
      )
```

************************
03 - useActionState
=======================

```javascript
      const [formState, formAction, isPending] = useFormHook()

      return (
        <form action={formAction} >
          <Input label='title' defaultValue={formState?.prevState?.title || ""} error={formState?.errors?.title || ""} />
          <button ... isPending>
          {
            serverResponse?.message ...
          }
        </form>
      )

      export type ResType = {
      success: boolean;
      prevState: Record<string, string>,
      errors: Record<string, string>,
      server?: string,
      } | null

      const useFormHook = () => {

        const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    
          const newTodo = Object.fromEntries(formData.entries())
          const responseObj = {
            success: false,
            prevState: newTodo as TodoType,
            errors: { title: "", content: "" },
            server: ""
          }

          // client validation
          const { success, data, error } = todoSchema.safeParse(newTodo)
          if (!success) {
            responseObj.errors =
            toast.error("Error Cliente")
            return responseObj
          }

          // server validation ...

          // si todo va bien
          toast.success("Todo añadido")
          responseObj.success = true
          responseObj.server = message
          responseObj.prevState = { title: "", content: "" }
          return responseObj

        }, null)

        return [formState, formAction, isPending] as const
      }
```

***************************
04 - RHF + useActionState 
=============================
(mucha mezcla)

```javascript
      const { register, reset, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })

      const [formState, formAction, isPending] = useFormHookOnlyServer(reset);
    
      const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        handleSubmit(() => {
          startTransition(() => formAction(new FormData(formRef.current!)))
        })(evt);
      }

      return (
        <form ref={formRef} action={formAction} onSubmit={onSubmit}>
          <InputRHF label={"title"} defaultValue={""} error={errors?.title?.message || ""} register={register} />
          <button ... isPending>
          {
            serverResponse?.message ...
          }

        </form>
      )

      export const useFormHookOnlyServer = (reset: UseFormReset<{ title: string; content: string; }>) => {

        const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
        const newTodo = Object.fromEntries(formData.entries()) as TodoType

        // llamada a server action y validacion

        ...
        }, null)

        return [formState, formAction, isPending] as const
       }
```

**************************************
05 - useActionState + RHF + Modal
=====================================

Son 2 formularios, el original, y otro para confirmar la operacion. El primero colecta los datos, y los verifica con RHF. Luego en el onSubmit,
almaceno los `inputFields` y cambio el booleano `showConirm` para intercambiar en pantalla los formularios. Con `inputFields` puedo pasar los valores
de un formulario al otro

```javascript
        const [inputValues, setInputValues] = useState({ title: "", content: "" })
        const [showConfirm, setShowConfirm] = useState<boolean>(false)
        const [serverResponse, setServerResponse] = useState({ success: false, message: "" })

        return (
          <>
            {
              showConfirm
                ? (
                  <ServerForm
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    setShowConfirm={setShowConfirm}
                    setServerResponse={setServerResponse}
                  />
                )
                : (
                  <ClientForm
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    setShowConfirm={setShowConfirm}
                    serverResponse={serverResponse}
                  />
                )
            }
          </>
        )
      }
    
      export const ClientForm = ({ inputValues, setInputValues, setShowConfirm, serverResponse }:

        const { register, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })

        const onSubmit: SubmitHandler<TodoType> = (data) => {
          const title = data?.title || ""
          const content = data?.content || ""
          setShowConfirm(prev => !prev)
          setInputValues({ title, content })
        }

        return (
          <form onSubmit={handleSubmit(onSubmit)} >
              <InputRHF label='title' defaultValue={inputValues.title} error={errors?.title?.message} register={register} />
              <button type="submit" className="btn btn-primary" >Crear</button>
              {
                serverResponse?.message ...
              }
          </form>
        )


      export const ServerForm = ({ inputValues, setInputValues, setShowConfirm, setServerResponse }:

        const [, formAction, isPending] = useFormHook(setShowConfirm, setServerResponse, setInputValues)
  
        return (
           <form action={formAction}>
              <Input label='title' defaultValue={inputValues.title} className="hidden" />
              <button type="submit" ...isPending>Confirmar</button>
              <button type="button" onClick={() => setShowConfirm(prev => !prev)}>Cancelar</button>
           </form>
        )
```

![alt text](https://avatars.githubusercontent.com/u/68980231?s=400&u=47296af9dbc2dba8be2e39a106545ddad55f98c7&v=4 "My avatar image")

This repository was built by [Jonatan Missora](https://github.com/jonatanjmissora).