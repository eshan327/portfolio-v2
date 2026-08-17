import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import { PROJECTS } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="section px-7 py-section-y md:px-14">
      <SectionHeader number="03" label="Project Index" />

      <ul
        className="projects-grid grid gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-2 xl:grid-cols-3"
        aria-label="Project cards"
      >
        {PROJECTS.map(project => (
          <li
            key={project.index}
            className="proj-card flex h-full flex-col bg-paper p-10 transition-colors duration-fast hover:bg-paper-surface"
          >
            <article className="flex h-full flex-col">
              <p className="text-label font-mono uppercase tracking-widest text-accent">
                {project.index} / {project.category}
              </p>

              <h3 className="mt-8 font-serif text-display-md leading-none text-ink">
                {project.nameLines.map((line, i) => (
                  <span key={i} className={i === project.italicLine ? 'italic text-accent' : ''}>
                    {line}
                    {i < project.nameLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h3>

              <p className="mt-6 border-t border-ink-line pt-4 text-body-sm font-mono text-ink">
                {project.proof}
              </p>

              <div className="mt-auto">
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <Tag key={`${project.index}-${tech}`} label={tech} />
                  ))}
                </div>

                {project.link ? (
                  <div className="link-actions-row">
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-inline"
                    >
                      {project.link.label}
                    </a>
                  </div>
                ) : (
                  <p className="status-inline">{project.status}</p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
