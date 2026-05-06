import { renderWithMotion, screen } from '../test-utils'

import Experience from '@/components/sections/Experience'
import { EXPERIENCE } from '@/data/experience'

describe('Experience section', () => {
  it('renders all experience entries', () => {
    renderWithMotion(<Experience />)

    EXPERIENCE.forEach(item => {
      expect(screen.getByText(item.company)).toBeInTheDocument()
      expect(screen.getByText(item.dateRange)).toBeInTheDocument()
      expect(screen.getByText(`${item.role} - ${item.location}`)).toBeInTheDocument()
    })
  })

  it('renders incoming badge for items that include one', () => {
    renderWithMotion(<Experience />)

    const incomingItem = EXPERIENCE.find(item => item.badge)
    expect(incomingItem).toBeDefined()
    expect(screen.getByText(incomingItem!.badge!)).toBeInTheDocument()
  })
})
