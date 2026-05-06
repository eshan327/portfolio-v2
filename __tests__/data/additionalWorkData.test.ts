import { ADDITIONAL_WORK } from '@/data/additionalWork'

describe('additional work data contracts', () => {
  it('has unique project names', () => {
    const names = ADDITIONAL_WORK.map(item => item.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('has non-empty summaries and stacks', () => {
    ADDITIONAL_WORK.forEach(item => {
      expect(item.summary.trim().length).toBeGreaterThan(0)
      expect(item.stack.length).toBeGreaterThan(0)
    })
  })

  it('ensures each item has links or an in-progress state', () => {
    ADDITIONAL_WORK.forEach(item => {
      expect(Boolean(item.links?.length) || item.isInProgress).toBe(true)

      item.links?.forEach(link => {
        expect(link.href).toMatch(/^https:\/\//)
      })
    })
  })
})
