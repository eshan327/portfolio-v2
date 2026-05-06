import FadeIn from '@/components/ui/FadeIn'
import LinkActions from '@/components/ui/LinkActions'
import MetricDisplay from '@/components/ui/MetricDisplay'
import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import { PROJECTS } from '@/data/projects'
import { getSectionConfig } from '@/lib/sections'

export default function Projects() {
  const section = getSectionConfig('projects')

  return (
    <FadeIn>
      <section id={section.id} aria-label={section.ariaLabel} className="section px-7 py-section-y md:px-14">
        <SectionHeader number={section.number} label={section.headerLabel} />

        <ul
          className="projects-grid grid gap-px overflow-hidden border border-ink-line bg-ink-line md:grid-cols-2 xl:grid-cols-3"
          aria-label="Project cards"
        >
          {PROJECTS.map(project => {
            return (
              <li
                key={project.index}
                className="proj-card flex h-full flex-col bg-paper p-10 transition-colors duration-fast hover:bg-paper-surface"
              >
                <article className="flex h-full flex-col">
                  <p className="text-label font-mono uppercase tracking-widest text-accent">
                    {project.index}
                  </p>

                  <h3 className="mt-8 font-serif text-display-md leading-none text-ink">
                    {project.nameLines.map((line, i) => (
                      <span key={i} className={i === project.italicLine ? 'italic text-accent' : ''}>
                        {line}
                        {i < project.nameLines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </h3>

                  <p className="mt-6 text-body-xs font-light font-mono leading-relaxed text-ink-muted">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <MetricDisplay value={project.metric.value} label={project.metric.label} />

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map(tech => (
                        <Tag key={`${project.index}-${tech}`} label={tech} />
                      ))}
                    </div>

                    <LinkActions
                      links={project.links}
                      isInProgress={project.isInProgress}
                      keyPrefix={project.index}
                    />
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </section>
    </FadeIn>
  )
}
