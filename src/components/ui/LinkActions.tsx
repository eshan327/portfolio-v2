import type { ProjectLink } from '@/types'

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
          <a
            key={`${keyPrefix}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline"
          >
            {link.label}
          </a>
        ))}
      </div>
    )
  }

  if (isInProgress) {
    return <p className="status-inline">In progress</p>
  }

  return null
}
