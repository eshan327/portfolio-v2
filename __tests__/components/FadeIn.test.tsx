import { render, screen } from '../test-utils'
import type { ReactNode } from 'react'

const useInViewMock = vi.fn()

vi.mock('framer-motion', () => {
  return {
    useInView: (...args: unknown[]) => useInViewMock(...args),
    motion: {
      div: ({ children, initial, animate }: { children: ReactNode; initial: unknown; animate: unknown }) => (
        <div data-testid="fade-in" data-initial={JSON.stringify(initial)} data-animate={JSON.stringify(animate)}>
          {children}
        </div>
      ),
    },
  }
})

import FadeIn from '@/components/ui/FadeIn'

describe('FadeIn', () => {
  it('uses hidden initial state before entering view', () => {
    useInViewMock.mockReturnValue(false)

    render(
      <FadeIn>
        <span>Content</span>
      </FadeIn>
    )

    const wrapper = screen.getByTestId('fade-in')
    expect(wrapper).toHaveAttribute('data-initial', JSON.stringify({ opacity: 0, y: 24 }))
    expect(wrapper).toHaveAttribute('data-animate', JSON.stringify({ opacity: 0, y: 24 }))
  })

  it('animates to visible state when in view', () => {
    useInViewMock.mockReturnValue(true)

    render(
      <FadeIn>
        <span>Content</span>
      </FadeIn>
    )

    const wrapper = screen.getByTestId('fade-in')
    expect(wrapper).toHaveAttribute('data-animate', JSON.stringify({ opacity: 1, y: 0 }))
  })
})
