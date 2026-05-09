import type { ProjectLink } from '@/types'

import TrackedLink from '@/components/ui/TrackedLink'

interface LinkActionsProps {
  links?: ProjectLink[]
  isInProgress?: boolean
  keyPrefix: string
}

export default function LinkActions({ links, isInProgress, keyPrefix }: LinkActionsProps) {
  if (links?.length) {
    return (
      <div className="link-actions-row">
        {links.map(link => (
          <TrackedLink
            key={`${keyPrefix}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline"
            eventName="project_link_click"
            eventData={{
              source: keyPrefix,
              label: link.label,
            }}
          >
            {link.label}
          </TrackedLink>
        ))}
      </div>
    )
  }

  if (isInProgress) {
    return <p className="status-inline">In progress</p>
  }

  return null
}
