import { EXPERIENCE } from '@/data/experience'

describe('experience data contracts', () => {
  it('has unique company names', () => {
    const companies = EXPERIENCE.map(item => item.company)
    expect(new Set(companies).size).toBe(companies.length)
  })

  it('has required role, date, and bullet content', () => {
    EXPERIENCE.forEach(item => {
      expect(item.role.trim().length).toBeGreaterThan(0)
      expect(item.dateRange.trim().length).toBeGreaterThan(0)
      expect(item.bullets.length).toBeGreaterThan(0)

      item.bullets.forEach(bullet => {
        expect(bullet.trim().length).toBeGreaterThan(0)
        expect((bullet.match(/<strong>/g) ?? []).length).toBe((bullet.match(/<\/strong>/g) ?? []).length)
      })
    })
  })

  it('only uses the incoming badge value when a badge is present', () => {
    EXPERIENCE.forEach(item => {
      if (item.badge) {
        expect(item.badge).toBe('Incoming')
      }
    })
  })
})
