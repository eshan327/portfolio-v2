import { renderWithMotion, screen, within } from '../test-utils'

import AdditionalWork from '@/components/sections/AdditionalWork'
import { ADDITIONAL_WORK } from '@/data/additionalWork'

describe('Additional Work section', () => {
  it('renders all additional work entries as a semantic list', () => {
    renderWithMotion(<AdditionalWork />)

    const workList = screen.getByRole('list', { name: /additional project work/i })
    const items = within(workList).getAllByRole('listitem')

    expect(items).toHaveLength(ADDITIONAL_WORK.length)
  })

  it('shows in-progress status when links are unavailable', () => {
    renderWithMotion(<AdditionalWork />)

    expect(screen.getByText(/in progress/i)).toBeInTheDocument()
  })

  it('renders outbound links for linked work items', () => {
    renderWithMotion(<AdditionalWork />)

    ADDITIONAL_WORK.forEach(item => {
      item.links?.forEach(link => {
        const matchingLinks = screen.getAllByRole('link', { name: link.label })
        expect(matchingLinks.some(anchor => anchor.getAttribute('href') === link.href)).toBe(true)
      })
    })
  })
})
