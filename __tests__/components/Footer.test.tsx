import { render, screen } from '../test-utils'

import Footer from '@/components/layout/Footer'

describe('Footer', () => {
  it('renders copyright and location text', () => {
    render(<Footer />)

    expect(screen.getByText(new RegExp(`Copyright ${new Date().getFullYear()}`))).toBeInTheDocument()
    expect(screen.getByText('College Park, Maryland')).toBeInTheDocument()
  })
})
