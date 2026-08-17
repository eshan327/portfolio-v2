export interface ExperienceItem {
  company: string
  role: string
  location: string
  dateRange: string
  focus: string[]
  stack: string[]
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  index: string
  category: string
  nameLines: string[]
  italicLine?: number
  proof: string
  stack: string[]
  link?: ProjectLink
  status?: string
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
