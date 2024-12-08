import NoteForm from '../../../_components/Forms/NoteForm'

export default async function NewNotePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const userId = (await searchParams).userid || ""

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <NoteForm userId={userId} />
    </div>
  )
}
