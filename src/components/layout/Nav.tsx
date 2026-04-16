'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import type { NavLink } from '@/types'

const NAV_LINKS: NavLink[] = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -65% 0px' }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-7 py-4 md:px-14">
        <a href="#" className="font-serif text-[17px] text-ink hover:text-accent transition-colors duration-fast">
          Eshan Khan
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(link => {
            const sectionId = link.href.slice(1)
            const isActive = activeSection === sectionId

            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-label font-mono uppercase tracking-widest transition-colors duration-fast ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-accent'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <button
          onClick={() => setMenuOpen(prev => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="-mr-3 p-3 text-ink-muted transition-colors duration-fast hover:text-accent md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {menuOpen ? (
              <>
                <line
                  x1="2"
                  y1="2"
                  x2="16"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="2"
                  x2="2"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <line
                  x1="2"
                  y1="5"
                  x2="16"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="2"
                  y1="9"
                  x2="16"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="2"
                  y1="13"
                  x2="16"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute left-0 right-0 top-full overflow-hidden border-b border-ink-line bg-paper/95 backdrop-blur-sm md:hidden"
          >
            <nav className="flex flex-col gap-1 px-7 py-4">
              {NAV_LINKS.map(link => {
                const sectionId = link.href.slice(1)
                const isActive = activeSection === sectionId

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 text-label font-mono uppercase tracking-widest transition-colors duration-fast ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
