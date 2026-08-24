'use client'

import { useRef } from 'react'

const NAV_LINKS = [
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Toolkit', '#skills'],
  ['Contact', '#contact'],
] as const

export default function Nav() {
  const menuRef = useRef<HTMLDialogElement>(null)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-line bg-paper/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-7 py-4 md:px-14">
        <a
          href="#overview"
          aria-label="Home"
          className="font-serif text-wordmark text-ink transition-colors duration-fast hover:text-accent"
        >
          Eshan Khan
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-label font-mono uppercase tracking-widest text-ink-muted transition-colors duration-fast hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => menuRef.current?.showModal()}
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
          aria-label="Open navigation menu"
          className="-mr-3 inline-flex min-h-11 min-w-11 items-center justify-center p-3 text-ink-muted transition-colors duration-fast hover:text-accent md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M2 5h14M2 9h14M2 13h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <dialog
        ref={menuRef}
        id="mobile-menu"
        aria-label="Mobile navigation"
        className="fixed inset-x-0 top-0 m-0 h-screen max-h-none w-full max-w-none bg-paper p-0 text-ink md:hidden"
      >
        <div className="flex items-center justify-between border-b border-ink-line px-7 py-4">
          <span className="font-serif text-wordmark">Eshan Khan</span>
          <button
            onClick={() => menuRef.current?.close()}
            aria-label="Close navigation menu"
            className="-mr-3 inline-flex min-h-11 min-w-11 items-center justify-center p-3 text-ink-muted hover:text-accent"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M3 3l12 12M15 3 3 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-7 py-4" aria-label="Mobile primary">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => menuRef.current?.close()}
              className="flex min-h-11 items-center py-3 text-label font-mono uppercase tracking-widest text-ink-muted hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
      </dialog>
    </header>
  )
}
