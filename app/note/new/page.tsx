import NewNoteForm from '../../../_components/Notes/NewNoteForm'

export default function NewNotePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

    const userId = searchParams?.userid || ""

  return (
    <div className="h-full flex flex-col items-center justify-center">
        <NewNoteForm />
    </div>
  )
}
