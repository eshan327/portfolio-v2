import { renderWithMotion, screen } from '../test-utils'

import Hero from '@/components/sections/Hero'
import { HERO_ACTION_LINKS } from '@/data/contact'

describe('Hero section', () => {
  it('renders overview label with section number', () => {
    renderWithMotion(<Hero />)

    expect(screen.getByText('01 / Overview')).toBeInTheDocument()
  })

  it('renders all expected action links', () => {
    renderWithMotion(<Hero />)

    const links = screen.getAllByRole('link')

    HERO_ACTION_LINKS.forEach(link => {
      const anchor = links.find(node => node.getAttribute('href') === link.href)
      expect(anchor).toBeDefined()
      expect(anchor).toHaveAttribute('href', link.href)

      if (link.external) {
        expect(anchor).toHaveAttribute('target', '_blank')
      }
    })
  })
})
