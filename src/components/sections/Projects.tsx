import SectionHeader from '@/components/ui/SectionHeader'
import { PROJECTS } from '@/data/projects'

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="px-7 py-section-y md:px-14"
    >
      <SectionHeader number="03" label="Projects" />

      <div className="border-b border-ink-line">
        <div className="hidden grid-cols-[40px_1fr_0.7fr_1.1fr_1.2fr] gap-6 border-b border-ink-line pb-3 text-label font-mono uppercase tracking-wider text-ink-muted lg:grid">
          <span>#</span>
          <span>Project</span>
          <span>Category</span>
          <span>Proof</span>
          <span>Stack / Link</span>
        </div>
        <ol aria-label="Project index">
          {PROJECTS.map((project, index) => (
            <li
              key={project.name}
              className="group grid gap-3 border-b border-ink-line py-5 last:border-b-0 lg:grid-cols-[40px_1fr_0.7fr_1.1fr_1.2fr] lg:gap-6 lg:items-center"
            >
              <span className="text-label font-mono text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-[20px] leading-tight text-ink">
                {project.name}
              </h3>
              <p className="text-label font-mono uppercase tracking-wide text-ink-muted">
                {project.category}
              </p>
              <p className="text-body-sm font-mono leading-relaxed text-ink">
                {project.proof}
              </p>
              <p className="text-body-sm font-mono leading-relaxed text-ink-muted">
                {project.stack.join(' · ')}
                {project.link ? (
                  <>
                    {' / '}
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {project.link.label}
                    </a>
                  </>
                ) : project.status ? (
                  <> / {project.status}</>
                ) : null}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
