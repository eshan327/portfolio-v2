interface SectionHeaderProps {
  number: string
  label: string
}

export default function SectionHeader({ number, label }: SectionHeaderProps) {
  return (
    <header
      className="mb-10 flex items-baseline gap-4 border-b border-ink-line pb-5"
      aria-label={label}
    >
      <span aria-hidden="true" className="text-body-sm font-mono text-accent">
        {number}
      </span>
      <h2 className="font-serif text-display-md leading-none text-ink">{label}</h2>
    </header>
  )
}
