import React from "react"

interface HighlightTextProps {
  text: string
  highlight: string
}

export default function HighlightText({ text, highlight }: HighlightTextProps) {
  if (!text || !highlight.trim()) return <span>{text}</span>

  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>,
      )}
    </>
  )
}
