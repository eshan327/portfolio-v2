import { CONTACT_LINKS } from '@/data/contact'
import SectionHeader from '@/components/ui/SectionHeader'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="px-7 py-section-y md:px-14"
    >
      <SectionHeader number="05" label="Contact" />

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="space-y-5">
          <h2 className="font-serif text-fluid-contact leading-none text-ink">Let&apos;s talk</h2>
          <p className="max-w-[42ch] text-body-md font-mono leading-relaxed text-ink-muted">
            Open to software, systems, and quantitative roles
          </p>
        </div>

        <ul className="border-t border-ink-line">
          {CONTACT_LINKS.map(link => (
            <li key={link.label} className="border-b border-ink-line">
              <a
                href={link.href}
                aria-label={link.external ? `${link.label} (opens in new tab)` : undefined}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group grid min-h-16 items-center gap-2 py-4 sm:grid-cols-[100px_minmax(0,1fr)]"
              >
                <span className="text-body-sm font-mono text-ink">{link.label}</span>
                <span className="break-words text-body-sm font-mono text-ink-muted group-hover:text-accent">
                  {link.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
