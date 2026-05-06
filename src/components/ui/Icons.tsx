import type { SVGProps } from 'react'

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M8.9 4.5h-2A2.4 2.4 0 0 0 4.5 6.9c0 6.96 5.64 12.6 12.6 12.6a2.4 2.4 0 0 0 2.4-2.4v-2l-3.3-.75a1 1 0 0 0-1.02.4l-.72 1a12.18 12.18 0 0 1-5.2-5.2l1-.72a1 1 0 0 0 .4-1.02L8.9 4.5Z" />
    </svg>
  )
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 11v6" />
      <path d="M8 8.5h.01" />
      <path d="M12 17v-3.4c0-1.1.9-2 2-2s2 .9 2 2V17" />
      <path d="M12 11v.3" />
    </svg>
  )
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.56c.43.08.6-.18.6-.42v-1.48c-2.46.54-2.98-1.02-2.98-1.02-.4-1-.98-1.3-.98-1.3-.8-.55.06-.54.06-.54.9.06 1.36.92 1.36.92.78 1.35 2.06.96 2.56.73.08-.57.3-.96.54-1.18-1.97-.22-4.04-.98-4.04-4.4 0-.97.35-1.76.92-2.39-.1-.23-.4-1.13.08-2.35 0 0 .76-.24 2.49.91a8.54 8.54 0 0 1 4.54 0c1.73-1.15 2.49-.91 2.49-.91.48 1.22.18 2.12.08 2.35.57.63.92 1.42.92 2.39 0 3.42-2.08 4.18-4.06 4.4.3.27.57.78.57 1.58v2.35c0 .24.16.5.6.42A8.5 8.5 0 0 0 12 3.5Z" />
    </svg>
  )
}
