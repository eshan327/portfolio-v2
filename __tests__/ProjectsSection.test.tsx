import { render, screen, within } from '@testing-library/react'

import Projects from '../src/components/sections/Projects'
import { PROJECTS } from '../src/data/projects'

describe('Projects section', () => {
  it('renders cards as a semantic list with one item per project', () => {
    render(<Projects />)

    const projectList = screen.getByRole('list', { name: /project cards/i })
    const listItems = within(projectList).getAllByRole('listitem')

    expect(listItems).toHaveLength(PROJECTS.length)
  })

  it('renders each project title line content', () => {
    render(<Projects />)

    PROJECTS.forEach(project => {
      project.nameLines.forEach(line => {
        expect(screen.getByText(line)).toBeInTheDocument()
      })
    })
  })
})
