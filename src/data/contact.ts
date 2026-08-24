import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN, SITE_PHONE } from '@/lib/constants'

const SITE_PHONE_DISPLAY = '+1 (443) 449-4909'

export const CONTACT_LINKS = [
  {
    label: 'Email',
    value: SITE_EMAIL,
    href: `mailto:${SITE_EMAIL}`,
    external: false,
  },
  {
    label: 'Phone',
    value: SITE_PHONE_DISPLAY,
    href: `tel:${SITE_PHONE}`,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/eshankhan05',
    href: SITE_LINKEDIN,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/eshan327',
    href: SITE_GITHUB,
    external: true,
  },
]
