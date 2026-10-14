import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="hero-copy">
        <p className="not-found-code">404</p>
        <h1>Page not found</h1>
        <p className="hero-intro">This page does not exist or has been moved.</p>
        <Link href="/" className="text-link">
          Back to home
        </Link>
      </div>
    </main>
  )
}
