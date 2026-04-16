interface MetricDisplayProps {
  value: string
  label: string
}

export default function MetricDisplay({ value, label }: MetricDisplayProps) {
  return (
    <div className="mt-5 border-t border-ink-line pt-4">
      <p className="font-serif text-display-md text-accent leading-none">{value}</p>
      <p className="mt-2 text-body-sm font-mono text-ink">{label}</p>
    </div>
  )
}
