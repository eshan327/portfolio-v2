import type { NavLink } from '@/types'

export type SectionKey = 'overview' | 'experience' | 'projects' | 'work' | 'skills' | 'contact'

type SectionConfig = {
  key: SectionKey
  id: string
  number: string
  headerLabel: string
  ariaLabel: string
  navLabel?: string
}

const SECTION_CONFIG_BY_KEY: Record<SectionKey, SectionConfig> = {
  overview: {
    key: 'overview',
    id: 'overview',
    number: '01',
    headerLabel: 'Overview',
    ariaLabel: 'Overview',
  },
  experience: {
    key: 'experience',
    id: 'experience',
    number: '02',
    headerLabel: 'Experience',
    ariaLabel: 'Experience',
  },
  projects: {
    key: 'projects',
    id: 'projects',
    number: '03',
    headerLabel: 'Selected Projects',
    ariaLabel: 'Selected Projects',
    navLabel: 'Projects',
  },
  work: {
    key: 'work',
    id: 'work',
    number: '04',
    headerLabel: 'Additional Work',
    ariaLabel: 'Additional Work',
    navLabel: 'Work',
  },
  skills: {
    key: 'skills',
    id: 'skills',
    number: '05',
    headerLabel: 'Skills',
    ariaLabel: 'Skills',
  },
  contact: {
    key: 'contact',
    id: 'contact',
    number: '06',
    headerLabel: 'Contact',
    ariaLabel: 'Contact',
  },
}

const NAV_SECTION_KEYS: SectionKey[] = ['experience', 'projects', 'work', 'skills', 'contact']

export const NAV_LINKS: NavLink[] = NAV_SECTION_KEYS.map(key => {
  const section = SECTION_CONFIG_BY_KEY[key]

  return {
    label: section.navLabel ?? section.headerLabel,
    href: `#${section.id}`,
  }
})

export function getSectionConfig(key: SectionKey): SectionConfig {
  return SECTION_CONFIG_BY_KEY[key]
}
