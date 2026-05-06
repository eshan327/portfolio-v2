import type { ReactElement, SVGProps } from 'react'

import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '@/components/ui/Icons'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { CONTACT_LINKS } from '@/data/contact'
import { getSectionConfig } from '@/lib/sections'
import type { ContactIconName } from '@/types'

const ICON_MAP: Record<ContactIconName, (props: SVGProps<SVGSVGElement>) => ReactElement> = {
  mail: MailIcon,
  phone: PhoneIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
}

export default function Contact() {
  const section = getSectionConfig('contact')

  return (
    <FadeIn>
      <section id={section.id} aria-label={section.ariaLabel} className="section px-7 py-section-y md:px-14">
        <SectionHeader number={section.number} label={section.headerLabel} />

        <div className="space-y-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-end">
            <div className="space-y-6">
              <h2 className="font-serif text-fluid-contact leading-none text-ink">
                Let&apos;s
                <br />
                <span className="italic text-accent">talk.</span>
              </h2>
              <p className="max-w-[38ch] text-body-sm font-mono leading-relaxed text-ink-muted">
                Open to conversations on quantitative research, market-making systems, and high-impact
                internships.
              </p>
            </div>

            <ul className="grid gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-2">
              {CONTACT_LINKS.map(link => {
                const Icon = ICON_MAP[link.icon]

                return (
                  <li key={link.label} className="bg-paper">
                    <a
                      href={link.href}
                      aria-label={link.external ? `${link.label} (opens in new tab)` : undefined}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="group flex min-h-[156px] flex-col justify-between px-5 py-5 transition-colors duration-fast hover:bg-paper-surface"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-accent transition-colors duration-fast group-hover:border-accent/60">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-tag font-mono uppercase tracking-widest text-ink-muted">
                          /{link.id}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <span className="block text-label font-mono uppercase tracking-widest text-ink-muted">
                          {link.label}
                        </span>
                        <p className="break-words text-body-sm font-mono leading-relaxed text-ink">
                          {link.value}
                        </p>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}
