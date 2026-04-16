import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-7 md:px-14">
      <div>
        <p className="mb-4 text-label font-mono uppercase tracking-widest text-accent">404</p>
        <h1 className="mb-6 font-serif text-display-md italic leading-none text-ink">Page not found.</h1>
        <p className="mb-8 text-body font-mono text-ink-muted">
          This page does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="border-b border-ink-line pb-0.5 text-label font-mono uppercase tracking-widest text-ink-muted transition-colors duration-fast hover:border-accent hover:text-accent"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
