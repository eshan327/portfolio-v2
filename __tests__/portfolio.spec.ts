import { expect, test } from '@playwright/test'

test('projects respond to hover, keyboard, and click without overflowing', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Eshan Khan', exact: true })).toBeVisible()

  const preview = page.locator('.preview-detail')
  await page.getByRole('link', { name: /Flowtime/ }).hover()
  await expect(preview).toContainText(
    'A focus timer with offline-safe, historically accurate sessions.'
  )

  await page.getByRole('link', { name: /Poisson Disk Sequences/ }).focus()
  await expect(preview).toContainText(
    'Minimum-distance blue-noise sampling in two and three dimensions.'
  )

  const palette = page.getByRole('button', { name: /Palette/ })
  await palette.click()
  await expect(preview).toContainText('On-device assistance for navigating Canvas coursework.')

  await page.getByRole('link', { name: /Kalshi Crypto Trader/ }).focus()
  await page.keyboard.press('Tab')
  await expect(preview).toContainText(
    'Minimum-distance blue-noise sampling in two and three dimensions.'
  )

  await expect
    .poll(() =>
      page.evaluate(() =>
        document
          .getAnimations()
          .filter(
            animation =>
              animation instanceof CSSAnimation &&
              animation.effect instanceof KeyframeEffect &&
              animation.effect.target instanceof Element &&
              animation.effect.target.closest('.project-visual:not(.is-active)')
          )
          .every(animation => animation.playState === 'paused')
      )
    )
    .toBe(true)

  for (const width of [320, 390, 900, 901, 950, 1024, 1025, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
        )
      )
      .toBe(true)
  }
})
