import type { ReactElement } from 'react'

import { render } from '@testing-library/react'

import MotionProvider from '@/components/ui/MotionProvider'

export * from '@testing-library/react'

export function renderWithMotion(ui: ReactElement) {
  return render(<MotionProvider>{ui}</MotionProvider>)
}
