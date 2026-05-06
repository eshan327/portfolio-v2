import { renderWithMotion, screen, within } from '../test-utils'

import Contact from '@/components/sections/Contact'
import { CONTACT_LINKS } from '@/data/contact'

describe('Contact section', () => {
  it('renders one card per contact link', () => {
    renderWithMotion(<Contact />)

    const list = screen.getByRole('list')
    const cards = within(list).getAllByRole('listitem')

    expect(cards).toHaveLength(CONTACT_LINKS.length)
  })

  it('renders expected link destinations and external targets', () => {
    renderWithMotion(<Contact />)

    const anchors = screen.getAllByRole('link')

    CONTACT_LINKS.forEach(link => {
      const anchor = anchors.find(node => node.getAttribute('href') === link.href)
      expect(anchor).toBeDefined()
      expect(anchor).toHaveAttribute('href', link.href)

      if (link.external) {
        expect(anchor).toHaveAttribute('target', '_blank')
      }
    })
  })
})
