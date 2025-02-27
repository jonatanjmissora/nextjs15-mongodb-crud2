import LoginForm from '../_components/Forms/LoginForm'
import NotesList from '../_components/Notes/NotesList'
import getUserFromCookie from '../_lib/utils/getUser'

export default async function page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const page = (await searchParams).page || "1"
  const user = await getUserFromCookie()

  return (
    <div className="flex justify-center items-center mx-auto w-[95%] pb-12 sm:pb-0 h-full sm:w-3/4">
      {
        user
          ? <NotesList user={user} page={page} />
          : <LoginForm />
      }

    </div>
  )
}
