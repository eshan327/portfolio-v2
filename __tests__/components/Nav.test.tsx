import { fireEvent, render, screen, waitFor, within } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { act } from 'react'

import Nav from '@/components/layout/Nav'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string): MediaQueryList => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }
    }),
  })
})

beforeEach(() => {
  window.location.hash = ''
  document.body.style.overflow = ''
})

describe('Nav', () => {
  it('opens and closes the mobile menu while locking body scroll', async () => {
    const user = userEvent.setup()

    render(<Nav />)

    const menuButton = screen.getByRole('button', { name: /open navigation menu/i })
    await user.click(menuButton)

    expect(document.body.style.overflow).toBe('hidden')

    const mobileNav = screen.getByRole('navigation', { name: /mobile primary/i })
    const firstLink = within(mobileNav).getByRole('link', { name: 'Experience' })

    await waitFor(() => {
      expect(firstLink).toHaveFocus()
    })

    await user.click(menuButton)

    await waitFor(() => {
      expect(screen.queryByRole('navigation', { name: /mobile primary/i })).not.toBeInTheDocument()
    })

    expect(document.body.style.overflow).toBe('')
  })

  it('closes on Escape and returns focus to the menu button', async () => {
    const user = userEvent.setup()

    render(<Nav />)

    const menuButton = screen.getByRole('button', { name: /open navigation menu/i })
    await user.click(menuButton)

    expect(screen.getByRole('navigation', { name: /mobile primary/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('navigation', { name: /mobile primary/i })).not.toBeInTheDocument()
    })

    expect(menuButton).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })

  it('traps Tab focus within mobile menu links', async () => {
    const user = userEvent.setup()

    render(<Nav />)

    const menuButton = screen.getByRole('button', { name: /open navigation menu/i })
    await user.click(menuButton)

    const mobileNav = screen.getByRole('navigation', { name: /mobile primary/i })
    const links = within(mobileNav).getAllByRole('link')

    const firstLink = links[0]
    const lastLink = links[links.length - 1]

    lastLink.focus()
    fireEvent.keyDown(window, { key: 'Tab' })

    expect(firstLink).toHaveFocus()

    firstLink.focus()
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true })

    expect(lastLink).toHaveFocus()
  })

  it('syncs active section state from hash changes', async () => {
    render(<Nav />)

    await act(async () => {
      window.location.hash = '#projects'
      fireEvent(window, new HashChangeEvent('hashchange'))
      await Promise.resolve()
    })

    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location')

    await act(async () => {
      window.location.hash = ''
      fireEvent(window, new HashChangeEvent('hashchange'))
      await Promise.resolve()
    })

    expect(screen.getByRole('link', { name: 'Projects' })).not.toHaveAttribute('aria-current')
  })
})
