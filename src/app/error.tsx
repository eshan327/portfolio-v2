'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-7 md:px-14">
      <div>
        <p className="mb-4 text-label font-mono uppercase tracking-widest text-accent">Error</p>
        <h1 className="mb-6 font-serif text-display-md italic leading-none text-ink">
          Something went wrong.
        </h1>
        <p className="mb-8 text-body font-mono text-ink-muted">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="border-b border-ink-line pb-0.5 text-label font-mono uppercase tracking-widest text-ink-muted transition-colors duration-fast hover:border-accent hover:text-accent"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
