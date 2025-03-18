import { redirect } from 'next/navigation'
import NoteForm from '../../../_components/Forms/NoteForm'
import { TokenType } from '../../../_lib/types/user.types'
import getUserFromCookie from '../../../_lib/utils/getUser'

export default async function NewNotePage() {

  const user = await getUserFromCookie() as TokenType
  if (!user) redirect("/")

  return (
    <div className="flex-1 flex justify-center items-center mx-auto w-[95%] h-full sm:w-3/4">
      <NoteForm userId={user._id.toString()} />
    </div>
  )
}
