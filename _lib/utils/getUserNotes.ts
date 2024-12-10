import { unstable_cache } from "next/cache"
import { getCollection } from "../mongoConnect"
import { ObjectId } from "mongodb"

export const getUserNotes = unstable_cache(async (userId: ObjectId) => {

  const notesCollection = await getCollection("notes")
  return await notesCollection.find({ author: userId }).toArray()
},
  ["notes"],
  {
    tags: ['notes'],
    revalidate: 3600,
  }
)