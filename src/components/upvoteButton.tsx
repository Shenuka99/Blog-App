'use client'

import { useState } from "react"

export default function UpvoteButton() {

  const [upvoteCount, setUpvoteCount] = useState(0)

  return (
    <button className="bg-blue-500 text-white p-2 mt-10" onClick={() => {
      setUpvoteCount((prev)=> prev + 1)
    }}>
      {upvoteCount}
      Upvote
      </button>
  
  )
}
