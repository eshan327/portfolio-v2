export interface ExperienceItem {
  company: string
  role: string
  location: string
  dateRange: string
  bullets: string[]
  badge?: string
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
}

export interface SkillRow {
  category: string
  skills: string
}

export interface NavLink {
  label: string
  href: string
}
