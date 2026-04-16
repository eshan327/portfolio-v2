export type BulletSegment = {
  text: string
  strong: boolean
}

export function parseBullet(raw: string): BulletSegment[] {
  const parts = raw.split(/(<strong>|<\/strong>)/)
  const segments: BulletSegment[] = []
  let inStrong = false

  for (const part of parts) {
    if (part === '<strong>') {
      inStrong = true
      continue
    }

    if (part === '</strong>') {
      inStrong = false
      continue
    }

    if (part.length > 0) {
      segments.push({ text: part, strong: inStrong })
    }
  }

  return segments
}
