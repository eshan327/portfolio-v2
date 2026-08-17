import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import { EXPERIENCE } from '@/data/experience'

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="section px-7 py-section-y md:px-14">
      <SectionHeader number="02" label="Experience" />

      <div>
        {EXPERIENCE.map((item, index) => (
          <article
            key={item.company}
            className={`exp-item grid items-start gap-6 border-t border-ink-line py-9 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)_max-content] ${
              index === EXPERIENCE.length - 1 ? 'border-b' : ''
            }`}
          >
            <p className="font-serif text-display-sm leading-none text-ink">{item.company}</p>

            <div className="min-w-0">
              <p className="mb-4 text-body-sm font-mono text-ink-muted">
                {item.role} - {item.location}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.focus.map(focus => (
                  <Tag key={focus} label={focus} />
                ))}
              </div>
              <p className="mt-4 text-body-sm font-mono text-ink">{item.stack.join(' · ')}</p>
            </div>

            <p className="order-first whitespace-nowrap text-left text-label font-mono uppercase tracking-widest text-ink-muted md:order-last md:justify-self-end md:text-right">
              {item.dateRange}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
