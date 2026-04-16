import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN, SITE_URL } from '@/lib/constants'

const CONTACT_LINKS = [
  {
    label: 'Email',
    href: `mailto:${SITE_EMAIL}`,
    external: false,
  },
  {
    label: 'LinkedIn',
    href: SITE_LINKEDIN,
    external: true,
  },
  {
    label: 'GitHub',
    href: SITE_GITHUB,
    external: true,
  },
  {
    label: 'Website',
    href: SITE_URL,
    external: true,
  },
]

export default function Contact() {
  return (
    <FadeIn>
      <section id="contact" className="section px-7 py-section-y md:px-14">
        <SectionHeader number="05" label="Contact" />

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-fluid-contact leading-none text-ink">
            Let&apos;s
            <br />
            <span className="italic text-accent">talk.</span>
          </h2>

          <div className="flex flex-col gap-1 md:items-end">
            {CONTACT_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="py-2 text-body font-mono text-ink-muted transition-colors duration-fast hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  )
}
