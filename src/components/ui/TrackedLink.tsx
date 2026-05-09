'use client'

import { track } from '@vercel/analytics'
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

type AnalyticsValue = string | number | boolean

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  eventName?: string
  eventData?: Record<string, AnalyticsValue>
}

export default function TrackedLink({
  children,
  eventName = 'link_click',
  eventData,
  href,
  onClick,
  ...rest
}: TrackedLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = event => {
    onClick?.(event)

    if (event.defaultPrevented) {
      return
    }

    track(eventName, {
      href: typeof href === 'string' ? href : '',
      ...eventData,
    })
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
