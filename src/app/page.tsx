import { EXPERIENCE } from '@/data/experience'
import ProjectExplorer from '@/components/ProjectExplorer'
import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN } from '@/lib/constants'

function ContourField({ id, compact = false }: { id: string; compact?: boolean }) {
  const lines = Array.from({ length: compact ? 15 : 23 })

  return (
    <svg
      className="contour-field"
      viewBox={compact ? '0 0 820 520' : '0 0 900 740'}
      role="img"
      aria-label="A slowly moving field of contour lines"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset=".18" stopColor="currentColor" stopOpacity=".75" />
          <stop offset=".82" stopColor="currentColor" stopOpacity=".75" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="contour-lines">
        {lines.map((_, index) => (
          <path
            key={index}
            d={compact
              ? 'M-40 165 C 120 35, 240 360, 410 230 S 680 60, 860 250'
              : 'M-80 260 C 130 40, 250 510, 470 285 S 720 90, 980 350'}
            transform={`translate(0 ${index * (compact ? 14 : 18)})`}
            stroke={`url(#${id})`}
          />
        ))}
      </g>
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Eshan Khan, home">EK</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>Eshan Khan</h1>
            <p className="hero-intro">Computer Science + Mathematics at the University of Maryland.</p>
            <div className="profile-facts">
              <span>Graduating May 2027</span>
              <span>Previously at IMC Trading</span>
            </div>
            <a className="text-link" href="#work">Selected work <span aria-hidden="true">↓</span></a>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <ContourField id="hero-field-fade" />
            <span className="field-point" />
          </div>
        </section>

        <section className="work section" id="work">
          <h2>Selected work</h2>
          <ProjectExplorer />
        </section>

        <section className="experience section" id="experience">
          <h2>Experience</h2>
          <div className="experience-list">
            {EXPERIENCE.map((item) => (
              <div className="experience-row" key={item.company}>
                <strong>{item.company}</strong>
                <span>{item.role}</span>
                <time>{item.years}</time>
              </div>
            ))}
            <div className="experience-contour" aria-hidden="true"><ContourField id="experience-field-fade" compact /></div>
          </div>
        </section>

        <section className="quote section" aria-label="A quote from Edsger Dijkstra">
          <blockquote>
            “The tools we use have a profound (and devious!) influence on our thinking habits, and, therefore, on our thinking abilities.”
          </blockquote>
          <cite>
            <a href="https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD498.html" target="_blank" rel="noreferrer">Edsger W. Dijkstra</a>
          </cite>
        </section>

        <section className="contact section" id="contact">
          <h2>Contact</h2>
          <div className="contact-links">
            <a href={`mailto:${SITE_EMAIL}`}>Email</a>
            <a href={SITE_GITHUB} target="_blank" rel="noreferrer">GitHub</a>
            <a href={SITE_LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </section>
      </main>

      <footer>
        <span>Eshan Khan</span>
        <a href="#top">Back to top</a>
      </footer>
    </>
  )
}
