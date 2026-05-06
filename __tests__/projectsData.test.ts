import { PROJECTS } from '../src/data/projects'

describe('projects data contracts', () => {
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
})
