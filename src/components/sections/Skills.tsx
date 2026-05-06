import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { SKILLS } from '@/data/skills'
import { getSectionConfig } from '@/lib/sections'

export default function Skills() {
  const section = getSectionConfig('skills')

  return (
    <FadeIn>
      <section id={section.id} aria-label={section.ariaLabel} className="section px-7 py-section-y md:px-14">
        <SectionHeader number={section.number} label={section.headerLabel} />

        <div className="max-w-skills-max">
          {SKILLS.map((row, index) => (
            <div
              key={row.category}
              className={`flex flex-col gap-3 border-t border-ink-line py-4 md:flex-row md:gap-6 ${
                index === SKILLS.length - 1 ? 'border-b' : ''
              }`}
            >
              <p className="min-w-skills-cat text-tag font-mono uppercase tracking-widest text-ink-muted">
                {row.category}
              </p>
              <p className="text-body-md font-mono text-ink">{row.skills}</p>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  )
}
