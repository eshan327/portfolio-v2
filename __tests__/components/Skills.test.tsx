import { renderWithMotion, screen } from '../test-utils'

import Skills from '@/components/sections/Skills'
import { SKILLS } from '@/data/skills'

describe('Skills section', () => {
  it('renders all skill rows', () => {
    renderWithMotion(<Skills />)

    SKILLS.forEach(row => {
      expect(screen.getByText(row.category)).toBeInTheDocument()
      expect(screen.getByText(row.skills)).toBeInTheDocument()
    })
  })
})
