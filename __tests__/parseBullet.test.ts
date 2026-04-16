import { parseBullet } from '../src/lib/parseBullet'
import { EXPERIENCE } from '../src/data/experience'

describe('parseBullet', () => {
  it('returns a single plain segment for a string with no tags', () => {
    const result = parseBullet('Built a REST API')
    expect(result).toEqual([{ text: 'Built a REST API', strong: false }])
  })

  it('correctly splits a string with one strong tag', () => {
    const result = parseBullet('Achieved <strong>83% accuracy</strong> using SVMs')
    expect(result).toEqual([
      { text: 'Achieved ', strong: false },
      { text: '83% accuracy', strong: true },
      { text: ' using SVMs', strong: false },
    ])
  })

  it('handles multiple strong tags in one bullet', () => {
    const result = parseBullet('Yielded <strong>9% CAGR</strong> and <strong>2.1 Sharpe</strong>')
    expect(result).toEqual([
      { text: 'Yielded ', strong: false },
      { text: '9% CAGR', strong: true },
      { text: ' and ', strong: false },
      { text: '2.1 Sharpe', strong: true },
    ])
  })

  it('returns no strong segments for a plain string', () => {
    const result = parseBullet('No tags here at all')
    expect(result.every(segment => !segment.strong)).toBe(true)
  })

  describe('data integrity - all experience bullets have paired <strong> tags', () => {
    EXPERIENCE.forEach(item => {
      item.bullets.forEach(bullet => {
        it(`"${bullet.slice(0, 40)}..." - tags are paired`, () => {
          const segments = parseBullet(bullet)
          const lastSegment = segments[segments.length - 1]
          expect(lastSegment?.strong).toBe(false)
        })
      })
    })
  })
})
