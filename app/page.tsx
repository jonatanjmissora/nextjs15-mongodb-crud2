import LoginForm from '../_components/Forms/LoginForm'
import NotesList from '../_components/Notes/NotesList'
import getUserFromCookie from '../_lib/utils/getUser'

export default async function page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const page = (await searchParams).page || "1"
  const user = await getUserFromCookie()

  return (
    <div className="h-full flex flex-col items-center">
      {
        user
          ? <NotesList user={user} page={page} />
          : <LoginForm />
      }

    </div>
  )
}
