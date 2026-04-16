import FadeIn from '@/components/ui/FadeIn'
import MetricDisplay from '@/components/ui/MetricDisplay'
import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import { PROJECTS } from '@/data/projects'

export default function Projects() {
  return (
    <FadeIn>
      <section id="projects" className="section px-7 py-section-y md:px-14">
        <SectionHeader number="03" label="Selected Projects" />

        <div className="projects-grid grid border border-ink-line md:grid-cols-3">
          {PROJECTS.map((project, index) => {
            const isLast = index === PROJECTS.length - 1

            return (
              <article
                key={project.index}
                className={`proj-card flex h-full flex-col p-10 transition-colors duration-fast hover:bg-paper-surface ${
                  isLast ? 'md:border-r-0' : 'md:border-r md:border-ink-line'
                } ${isLast ? '' : 'border-b border-ink-line md:border-b-0'}`}
              >
                <p className="text-label font-mono uppercase tracking-widest text-accent">{project.index}</p>

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
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </FadeIn>
  )
}
