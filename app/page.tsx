import LoginForm from '../_components/Auth/LoginForm'
import NotesList from '../_components/Notes/NotesList'
import getUserFromCookie from '../_lib/utils/getUser'

export default async function page() {

  const user = await getUserFromCookie()

  return (
    <div className="h-full flex flex-col items-center">
      {
        user
          ? <NotesList user={user} />
          : <LoginForm />
      }

    </div>
  )
}
