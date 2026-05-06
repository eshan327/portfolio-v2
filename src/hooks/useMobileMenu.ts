'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false)

    if (restoreFocus) {
      queueMicrotask(() => menuButtonRef.current?.focus())
    }
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    queueMicrotask(() => firstMobileLinkRef.current?.focus())
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMenu(true)
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [closeMenu, menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const menu = mobileMenuRef.current
      if (!menu) {
        return
      }

      const focusableLinks = menu.querySelectorAll<HTMLAnchorElement>('a[href]')
      if (focusableLinks.length === 0) {
        return
      }

      const firstLink = focusableLinks[0]
      const lastLink = focusableLinks[focusableLinks.length - 1]

      if (event.shiftKey && document.activeElement === firstLink) {
        event.preventDefault()
        lastLink.focus()
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault()
        firstLink.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeMenu, menuOpen])

  return {
    menuOpen,
    toggleMenu,
    closeMenu,
    firstMobileLinkRef,
    menuButtonRef,
    mobileMenuRef,
  }
}
