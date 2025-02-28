"use client"

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

export default function NotesPagination({ totalNotes, page }: { totalNotes: number, page: string }) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const notesPerPage = 6
  const totalPages = Math.ceil(totalNotes / notesPerPage)

  const pageArray = [...Array(totalPages).keys()]

  const handleClick = (clickedPage: string) => {
    const params = new URLSearchParams(searchParams);

    if (clickedPage === page) return
    else {
      params.set("page", clickedPage)
      router.replace(`${pathname}?${params.toString()}`);
    }

  }

  return (
    <div className="flex gap-3 py-2 mt-12 sm:mt-0">
      {pageArray.map(pageElement =>

        <span
          key={pageElement}
          className={`btn ${+page === pageElement + 1 && "btn-primary border border-slate-600"}`}
          onClick={() => handleClick((pageElement + 1).toString())}
        >
          {pageElement + 1}
        </span>

      )}
    </div>
  )
}
