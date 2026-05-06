export interface ExperienceItem {
  company: string
  role: string
  location: string
  dateRange: string
  bullets: string[]
  badge?: string
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  index: string
  nameLines: string[]
  italicLine?: number
  description: string
  metric: {
    value: string
    label: string
  }
  stack: string[]
  links?: ProjectLink[]
  isInProgress?: boolean
}

export interface AdditionalWorkItem {
  name: string
  summary: string
  stack: string[]
  links?: ProjectLink[]
  isInProgress?: boolean
}

export type ContactIconName = 'mail' | 'phone' | 'linkedin' | 'github'

export interface ContactLink {
  id: string
  label: string
  value: string
  href: string
  external: boolean
  icon: ContactIconName
}

export interface HeroActionLink {
  label: string
  href: string
  external?: boolean
}

export interface SkillRow {
  category: string
  skills: string
}

export interface NavLink {
  label: string
  href: string
}
