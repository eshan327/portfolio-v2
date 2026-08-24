import SectionHeader from '@/components/ui/SectionHeader'
import { EXPERIENCE } from '@/data/experience'

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="px-7 py-section-y md:px-14"
    >
      <SectionHeader number="02" label="Experience" />

      <div className="border-b border-ink-line">
        <div className="hidden grid-cols-[1fr_1.2fr_0.8fr_1.2fr_1fr] gap-8 border-b border-ink-line pb-3 text-label font-mono uppercase tracking-wider text-ink-muted lg:grid">
          <span>Company</span>
          <span>Role / Location</span>
          <span>Dates</span>
          <span>Focus</span>
          <span>Stack</span>
        </div>
        {EXPERIENCE.map(item => (
          <article
            key={item.company}
            className="grid gap-5 border-b border-ink-line py-7 last:border-b-0 lg:grid-cols-[1fr_1.2fr_0.8fr_1.2fr_1fr] lg:gap-8"
          >
            <h3 className="font-serif text-display-md leading-tight text-ink">{item.company}</h3>
            <p className="text-body-sm font-mono leading-relaxed text-ink">
              {item.role}
              <br />
              <span className="text-ink-muted">{item.location}</span>
            </p>
            <p className="text-body-sm font-mono leading-relaxed text-ink">{item.dateRange}</p>
            <p className="text-body-sm font-mono leading-relaxed text-ink">
              {item.focus.join(' · ')}
            </p>
            <p className="text-body-sm font-mono leading-relaxed text-ink-muted">
              {item.stack.join(' · ')}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
