import { NoteType } from "../types/note.type"

export const sortedNotesByPin = (notes: NoteType[], page: number) => {
  const notesPerPage = 6
  const pinnedNotes = []
  const notPinnedNotes = []
  notes.forEach(note => note.pinned ? pinnedNotes.push(note) : notPinnedNotes.push(note))
  const sortedNotes = [...pinnedNotes, ...notPinnedNotes]

  const firstNoteIndex = ((page - 1) * notesPerPage)
  const lastNoteIndex = (page - 1) * notesPerPage + (notesPerPage - 1)
  const notesToShow = sortedNotes.slice(firstNoteIndex, lastNoteIndex + 1)
  return notesToShow
}