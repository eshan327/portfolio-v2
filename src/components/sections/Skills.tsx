import SectionHeader from '@/components/ui/SectionHeader'
import { SKILLS } from '@/data/skills'

export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Toolkit"
      className="section px-7 py-section-y md:px-14"
    >
      <SectionHeader number="04" label="Toolkit" />

      <div className="border-b border-ink-line">
        {SKILLS.map(row => (
          <div
            key={row.category}
            className="grid gap-4 border-b border-ink-line py-6 last:border-b-0 md:grid-cols-[260px_minmax(0,1fr)] md:items-center"
          >
            <h3 className="font-serif text-display-sm leading-none text-ink">
              {row.category}
            </h3>
            <p className="border-ink-line text-body-md font-mono leading-relaxed text-ink md:border-l md:pl-10">
              {row.skills}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
