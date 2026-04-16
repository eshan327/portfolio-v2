interface SectionHeaderProps {
  number: string
  label: string
}

export default function SectionHeader({ number, label }: SectionHeaderProps) {
  return (
    <div className="mb-16 flex items-center gap-4" aria-label={label}>
      <span aria-hidden="true" className="text-label font-mono text-accent">
        {number}
      </span>
      <span className="text-label font-mono uppercase tracking-widest text-ink-muted">{label}</span>
      <div aria-hidden="true" className="h-px flex-1 bg-ink-line" />
    </div>
  )
}
