import { SKILLS } from '@/data/skills'

describe('skills data completeness', () => {
  it('includes resume-level tool coverage', () => {
    const infrastructureRow = SKILLS.find(row => row.category === 'Infrastructure')

    expect(infrastructureRow).toBeDefined()
    expect(infrastructureRow?.skills).toContain('Jira')
    expect(infrastructureRow?.skills).toContain('Figma')
  })

  it('includes required coursework from resume baseline', () => {
    const courseworkRow = SKILLS.find(row => row.category === 'Coursework')

    expect(courseworkRow).toBeDefined()
    expect(courseworkRow?.skills).toContain('Data Structures')
    expect(courseworkRow?.skills).toContain('Functional Programming')
    expect(courseworkRow?.skills).toContain('Object-Oriented Programming')
  })
})
