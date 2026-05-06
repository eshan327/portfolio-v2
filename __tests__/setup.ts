import '@testing-library/jest-dom/vitest'

Object.defineProperty(window, 'scrollTo', {
	writable: true,
	value: vi.fn(),
})

class MockIntersectionObserver implements IntersectionObserver {
	readonly root = null
	readonly rootMargin = ''
	readonly thresholds = []

	constructor(_callback: IntersectionObserverCallback) {}

	disconnect = vi.fn()
	observe = vi.fn()
	takeRecords = vi.fn(() => [])
	unobserve = vi.fn()
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
