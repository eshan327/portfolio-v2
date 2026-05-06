import FadeIn from '@/components/ui/FadeIn'
import LinkActions from '@/components/ui/LinkActions'
import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import { ADDITIONAL_WORK } from '@/data/additionalWork'
import { getSectionConfig } from '@/lib/sections'

export default function AdditionalWork() {
  const section = getSectionConfig('work')

  return (
    <FadeIn>
      <section id={section.id} aria-label={section.ariaLabel} className="section px-7 py-section-y md:px-14">
        <SectionHeader number={section.number} label={section.headerLabel} />

        <ul
          className="grid gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-2"
          aria-label="Additional project work"
        >
          {ADDITIONAL_WORK.map(item => (
            <li key={item.name} className="bg-paper p-8 transition-colors duration-fast hover:bg-paper-surface">
              <article className="flex h-full flex-col">
                <h3 className="font-serif text-display-sm leading-none text-ink">{item.name}</h3>

                <p className="mt-4 text-body-sm font-mono leading-relaxed text-ink-muted">{item.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map(tech => (
                    <Tag key={`${item.name}-${tech}`} label={tech} />
                  ))}
                </div>

                <LinkActions links={item.links} isInProgress={item.isInProgress} keyPrefix={item.name} />
              </article>
            </li>
          ))}
        </ul>
      </section>
    </FadeIn>
  )
}
