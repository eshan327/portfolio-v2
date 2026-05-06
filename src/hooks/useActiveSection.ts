'use client'

import { useEffect, useState } from 'react'

import type { NavLink } from '@/types'

interface UseActiveSectionOptions {
  links: NavLink[]
  onHashChange?: () => void
}

export function useActiveSection({ links, onHashChange }: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      onHashChange?.()

      if (!hash) {
        setActiveSection('')
        return
      }

      if (links.some(link => link.href === `#${hash}`)) {
        setActiveSection(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    queueMicrotask(handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [links, onHashChange])

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

  return { activeSection, setActiveSection }
}
