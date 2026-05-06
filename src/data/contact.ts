import type { ContactLink, HeroActionLink } from '@/types'

import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN, SITE_PHONE, SITE_RESUME } from '@/lib/constants'

const SITE_PHONE_DISPLAY = '+1 (443) 449-4909'

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: '01',
    label: 'Email',
    value: SITE_EMAIL,
    href: `mailto:${SITE_EMAIL}`,
    external: false,
    icon: 'mail',
  },
  {
    id: '02',
    label: 'Phone',
    value: SITE_PHONE_DISPLAY,
    href: `tel:${SITE_PHONE}`,
    external: false,
    icon: 'phone',
  },
  {
    id: '03',
    label: 'LinkedIn',
    value: 'linkedin.com/in/eshankhan05',
    href: SITE_LINKEDIN,
    external: true,
    icon: 'linkedin',
  },
  {
    id: '04',
    label: 'GitHub',
    value: 'github.com/eshan327',
    href: SITE_GITHUB,
    external: true,
    icon: 'github',
  },
]

export const HERO_ACTION_LINKS: HeroActionLink[] = [
  {
    label: 'Email',
    href: `mailto:${SITE_EMAIL}`,
  },
  {
    label: 'LinkedIn',
    href: SITE_LINKEDIN,
    external: true,
  },
  {
    label: 'GitHub',
    href: SITE_GITHUB,
    external: true,
  },
  {
    label: 'Resume',
    href: SITE_RESUME,
  },
]
