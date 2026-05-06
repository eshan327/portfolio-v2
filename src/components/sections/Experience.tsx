import { Fragment } from 'react'

import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { EXPERIENCE } from '@/data/experience'
import { parseBullet } from '@/lib/parseBullet'

export default function Experience() {
  return (
    <FadeIn>
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
              <div>
                <p className="font-serif text-display-sm leading-none text-ink">{item.company}</p>
                {item.badge ? (
                  <span className="mt-2 inline-block border border-accent px-2 py-0.5 text-tag font-mono uppercase tracking-wide text-accent">
                    {item.badge}
                  </span>
                ) : null}
              </div>

              <div className="min-w-0">
                <p className="mb-4 text-body-sm font-mono text-ink-muted">
                  {item.role} - {item.location}
                </p>
                <ul className="space-y-2">
                  {item.bullets.map(bullet => (
                    <li key={bullet} className="grid grid-cols-[12px_minmax(0,1fr)] gap-3 text-body font-mono leading-relaxed text-ink">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      <span>
                        {parseBullet(bullet).map((segment, i) =>
                          segment.strong ? (
                            <strong key={i} className="font-medium text-accent">
                              {segment.text}
                            </strong>
                          ) : (
                            <Fragment key={i}>{segment.text}</Fragment>
                          )
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="order-first whitespace-nowrap text-left text-label font-mono uppercase tracking-widest text-ink-muted md:order-last md:justify-self-end md:text-right">
                {item.dateRange}
              </p>
            </article>
          ))}
        </div>
      </section>
    </FadeIn>
  )
}
