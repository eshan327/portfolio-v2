import { CONTACT_LINKS } from '@/data/contact'

export default function Hero() {
  return (
    <section
      id="overview"
      aria-label="Overview"
      className="px-7 pb-4 pt-36 md:px-14 md:pb-8 md:pt-44"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:items-end lg:gap-24">
        <div className="space-y-9">
          <h1 className="whitespace-nowrap font-serif text-fluid-hero leading-none text-ink">
            Eshan Khan
          </h1>

          <div className="flex max-w-[520px] flex-wrap items-center gap-x-7 border-t border-ink-line pt-3">
            {CONTACT_LINKS.filter(link => link.label !== 'Phone').map(link => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.external ? `${link.label} (opens in new tab)` : undefined}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="link-inline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-7 border-t border-ink-line pt-7 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
          <p className="max-w-[31ch] font-serif text-fluid-tagline leading-tight text-ink">
            Software, quantitative systems, and applied machine learning
          </p>

          <div className="space-y-1 text-body-sm font-mono text-ink-muted">
            <p>Computer Science + Mathematics · UMD</p>
            <p>Quantitative Trader Intern · IMC Trading</p>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="mt-20 flex items-center gap-4 text-label text-accent">
        <span>01</span>
        <span className="h-px flex-1 bg-ink-line" />
      </div>
    </section>
  )
}
