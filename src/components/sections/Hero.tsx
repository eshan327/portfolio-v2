import { HERO_ACTION_LINKS } from '@/data/contact'

export default function Hero() {
  return (
    <section
      id="overview"
      aria-label="Overview"
      className="hero min-h-screen min-h-[100svh] px-7 pb-12 pt-32 md:px-14 md:pt-36"
    >
      <div className="hero-top grid gap-12 md:grid-cols-2 md:items-end">
        <div>
          <h1 className="font-serif text-fluid-hero leading-none text-ink">
            Eshan
            <br />
            <span className="italic text-accent">Khan.</span>
          </h1>
        </div>

        <div className="space-y-6">
          <p className="text-label font-mono uppercase tracking-widest text-accent">
            01 / Overview
          </p>

          <p className="max-w-[34ch] font-serif text-fluid-tagline leading-[1.1] text-ink">
            Quantitative trading, <em className="italic text-accent">market systems</em>, and
            applied machine learning.
          </p>

          <div className="space-y-1 text-body-sm font-mono text-ink-muted">
            <p>
              Computer Science + Mathematics · <span className="font-medium text-ink">UMD</span>
            </p>
            <p>
              Quantitative Trader Intern · <span className="font-medium text-ink">IMC Trading</span>
            </p>
            <p>Research · execution · systems</p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-6 border-t border-ink-line pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:ml-auto">
          {HERO_ACTION_LINKS.map(link => (
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
    </section>
  )
}
