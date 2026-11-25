export function Footer() {
  return (
    <footer
      className="melt-void flex w-full flex-wrap items-center justify-between gap-4 py-12 text-sm gutter-x"
      style={{ color: 'var(--ink-secondary)' }}
    >
      <span
        className="inline-flex items-center gap-2.5 text-lg font-bold tracking-[-0.03em]"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
      >
        <span
          className="inline-block h-4 w-2 -skew-x-12"
          style={{ backgroundColor: 'var(--accent)' }}
          aria-hidden="true"
        />
        Jesu Fitness
      </span>
      <span>307, MKN Rd, Alandur, St. Thomas Mount, Chennai 600016</span>
      <span>Photography via Unsplash &amp; Pexels</span>
    </footer>
  );
}
