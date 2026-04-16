export default function Footer() {
  return (
    <footer className="border-t border-ink-line px-7 py-5 md:px-14">
      <div className="flex flex-col gap-2 text-label font-mono uppercase tracking-widest text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>Copyright {new Date().getFullYear()} Eshan Khan</p>
        <p>College Park, Maryland</p>
      </div>
    </footer>
  )
}
