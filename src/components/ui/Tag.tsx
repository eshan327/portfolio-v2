interface TagProps {
  label: string
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-flex border border-ink-line px-2 py-0.5 text-tag font-mono uppercase tracking-wide text-ink-muted">
      {label}
    </span>
  )
}
