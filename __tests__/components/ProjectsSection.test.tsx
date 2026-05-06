import { renderWithMotion, screen, within } from '../test-utils'

import Projects from '@/components/sections/Projects'
import { PROJECTS } from '@/data/projects'

describe('Projects section', () => {
  it('renders cards as a semantic list with one item per project', () => {
    renderWithMotion(<Projects />)

    const projectList = screen.getByRole('list', { name: /project cards/i })
    const listItems = within(projectList).getAllByRole('listitem')

    expect(listItems).toHaveLength(PROJECTS.length)
  })

  it('renders each project title line content', () => {
    renderWithMotion(<Projects />)

    PROJECTS.forEach(project => {
      project.nameLines.forEach(line => {
        expect(screen.getByText(line)).toBeInTheDocument()
      })
    })
  })

  it('renders expected project links and statuses', () => {
    renderWithMotion(<Projects />)

    PROJECTS.forEach(project => {
      if (project.links?.length) {
        project.links.forEach(link => {
          const matchingLinks = screen.getAllByRole('link', { name: link.label })
          expect(matchingLinks.some(anchor => anchor.getAttribute('href') === link.href)).toBe(true)
        })
      }

      if (project.isInProgress) {
        expect(screen.getByText(/in progress/i)).toBeInTheDocument()
      }
    })
  })
})
