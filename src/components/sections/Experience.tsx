import { Fragment } from 'react'

import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { EXPERIENCE } from '@/data/experience'
import { parseBullet } from '@/lib/parseBullet'

export default function Experience() {
  return (
    <FadeIn>
      <section id="experience" className="section px-7 py-section-y md:px-14">
        <SectionHeader number="02" label="Experience" />

        <div>
          {EXPERIENCE.map((item, index) => (
            <article
              key={item.company}
              className={`exp-item grid gap-6 border-t border-ink-line py-9 md:grid-cols-[200px_1fr_160px] ${
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

              <div>
                <p className="mb-4 text-body-sm font-mono text-ink-muted">
                  {item.role} - {item.location}
                </p>
                <ul className="space-y-2">
                  {item.bullets.map(bullet => (
                    <li
                      key={bullet}
                      className="relative pl-5 text-body font-mono leading-relaxed text-ink before:absolute before:left-0 before:top-0 before:text-accent before:content-['-']"
                    >
                      {parseBullet(bullet).map((segment, i) =>
                        segment.strong ? (
                          <strong key={i} className="font-medium text-accent">
                            {segment.text}
                          </strong>
                        ) : (
                          <Fragment key={i}>{segment.text}</Fragment>
                        )
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="order-first text-left text-label font-mono uppercase tracking-widest text-ink-muted md:order-last md:text-right">
                {item.dateRange}
              </p>
            </article>
          ))}
        </div>
      </section>
    </FadeIn>
  )
}
