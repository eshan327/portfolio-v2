import { PROJECTS } from '@/data/projects'

describe('projects data contracts', () => {
  it('keeps headline projects between 3 and 5 items', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(3)
    expect(PROJECTS.length).toBeLessThanOrEqual(5)
  })

  it('has unique project indexes', () => {
    const indexes = PROJECTS.map(project => project.index)
    expect(new Set(indexes).size).toBe(indexes.length)
  })

  it('keeps italicLine within nameLines bounds when provided', () => {
    PROJECTS.forEach(project => {
      if (project.italicLine === undefined) {
        return
      }

      expect(project.italicLine).toBeGreaterThanOrEqual(0)
      expect(project.italicLine).toBeLessThan(project.nameLines.length)
    })
  })

  it('has non-empty descriptions and metric labels', () => {
    PROJECTS.forEach(project => {
      expect(project.description.trim().length).toBeGreaterThan(0)
      expect(project.metric.label.trim().length).toBeGreaterThan(0)
      expect(project.stack.length).toBeGreaterThan(0)
    })
  })

  it('ensures each project has links or an in-progress status', () => {
    PROJECTS.forEach(project => {
      expect(Boolean(project.links?.length) || project.isInProgress).toBe(true)

      project.links?.forEach(link => {
        expect(link.label.trim().length).toBeGreaterThan(0)
        expect(link.href).toMatch(/^https:\/\//)
      })
    })
  })
})
