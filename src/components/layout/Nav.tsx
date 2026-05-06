'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback } from 'react'

import { useActiveSection } from '@/hooks/useActiveSection'
import { useMobileMenu } from '@/hooks/useMobileMenu'
import { NAV_LINKS } from '@/lib/sections'

export default function Nav() {
  const {
    menuOpen,
    toggleMenu,
    closeMenu,
    firstMobileLinkRef,
    menuButtonRef,
    mobileMenuRef,
  } = useMobileMenu()
  const { activeSection, setActiveSection } = useActiveSection({
    links: NAV_LINKS,
    onHashChange: closeMenu,
  })

  const handleHomeClick = useCallback(() => {
    closeMenu()
    setActiveSection('')
  }, [closeMenu, setActiveSection])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-7 py-4 md:px-14">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          aria-label="Home"
          onClick={handleHomeClick}
          className="font-serif text-wordmark text-ink transition-colors duration-fast hover:text-accent"
        >
          Eshan Khan
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map(link => {
            const sectionId = link.href.slice(1)
            const isActive = activeSection === sectionId

            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
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
          ref={menuButtonRef}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="-mr-3 inline-flex min-h-11 min-w-11 items-center justify-center p-3 text-ink-muted transition-colors duration-fast hover:text-accent md:hidden"
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
            ref={mobileMenuRef}
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute left-0 right-0 top-full max-h-[calc(100svh-72px)] overflow-hidden overflow-y-auto border-b border-ink-line bg-paper/95 overscroll-contain backdrop-blur-sm md:hidden"
          >
            <nav className="flex flex-col gap-1 px-7 py-4" aria-label="Mobile primary">
              {NAV_LINKS.map((link, index) => {
                const sectionId = link.href.slice(1)
                const isActive = activeSection === sectionId

                return (
                  <a
                    key={link.label}
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => closeMenu()}
                    className={`flex min-h-11 items-center py-3 text-label font-mono uppercase tracking-widest transition-colors duration-fast ${
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
