
![alt text](/public/preview-desk.webp "preview image repository")
![alt text](/public/preview-mobil.webp "preview image repository")
# Info:
Probamos un CRUD con conexion a mongoDB. Se trata de leer, crear, editar o borrar una serie de tarjetas de superheroes. Server actions. 
      
# Utilizamos:
-  utilizamos mongodb package para la conexion.
-  zod como validacion y tipo.
-  toast para mostrar resultado.
-  useState para mostrar errores o conservar los valores del input luego de llamar a la accion del form.
-  React Hook Form.
-  useActionState.

****************************
Note Form
==========

```javascript
    export default function NoteForm({ userId, note }: { userId: string, note?: NoteFixType }) {

      const { formState, formAction, isPending } = useFormState({ userId, note })

      return (
        <form action={formAction} >

          <input ... defaultValue={formState?.prevState?.title || note?.title || ""}/>
          <p>{formState?.errors?.title}</p>

          <input ... defaultValue={formState?.prevState?.content || note?.content || ""}/>
          <p>{formState?.errors?.content}</p>

          <button disabled={isPending}>editar - crear</button>
        
        </form>
      )
```

****************************
useFormState Hook
==================

```javascript
      export default function useFormState({ userId, note }: { userId: string, note?: NoteFixType }) {

        const router = useRouter()

        const [formState, formAction, isPending] = useActionState(async (prevState: ServerResponse, formData: FormData) => {
          const { title, content } = Object.fromEntries(formData.entries())

          if (title.toString().trim() === "" && content.toString().trim() === "") return

          const newNote = { title: ... }
          // client validation con zod
          const { success, data, error } = noteSchema.safeParse(newNote)
          if (!success) {
            ...
          }

          // db response
          const res = note?._id
            ? await editNote(userId, note?._id, data)
            : await createNote(userId, data)

          if (res?.success) {...}
          else {...}

        }, null)

        return { formState, formAction, isPending }

      }
```

****************************
server actions
===============

```javascript
    export const createNote = async (userId: string, newNote: NoteType) => {

      const failObject = {
        success: false,
        prevState: { title: newNote?.title, content: newNote?.content },
        errors: { title: "", content: "" }
      }

      const user = await getUserFromCookie() as TokenType
      if (!user || user._id !== userId) return failObject

      // data validation
      const { success, data, error } = noteSchema.safeParse(newNote)
      if (!success) { ... }

      try {
        // db validation
        const notesCollection = await getCollection("notes")
        const res = await notesCollection.insertOne(newNote)
        if (!res.insertedId.toString()) { ... }

        revalidateTag('notes')
        return {
          success: true,
          prevState: { title: newNote.title, content: newNote.content },
          errors: { title: "", content: "" }
        }

      } catch (error) {
        failObject.errors.content = getErrorMessage(error)
        return failObject
      }

    }
```
*********************************************
```javascript
    export const editNote = async (userId: string, id: string, newNote: NoteType) => {

      const failObject = {
        success: false,
        prevState: { title: newNote.title, content: newNote.content },
        errors: { title: "", content: "" }
      }

      const user = await getUserFromCookie() as TokenType
      if (!user || user._id !== userId) return failObject

      //  data validation
      const { success, data, error } = noteSchema.safeParse(newNote)
      if (!success) { ... }

      try {
        const { title, content } = data
        const notesCollection = await getCollection("notes")
        // db validation
        const res = await notesCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: { "title": title, "content": content }
          }
        )
        if (res.modifiedCount !== 1) {
          failObject.errors.content = "Error al editar nota"
          return failObject
        }

        revalidateTag('notes')
        return {
          success: true,
          prevState: { title, content },
          errors: { title: "", content: "" }
        }
      } catch (error) {
        failObject.errors.content = getErrorMessage(error)
        return failObject
      }

    }
```

![alt text](https://avatars.githubusercontent.com/u/68980231?s=400&u=47296af9dbc2dba8be2e39a106545ddad55f98c7&v=4 "My avatar image")

This repository was built by [Jonatan Missora](https://github.com/jonatanjmissora).