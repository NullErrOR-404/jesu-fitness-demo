import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { label: 'Story', href: '#story' },
  { label: 'Equipment', href: '#equipment' },
  { label: 'About', href: '#about' },
  { label: 'Packages', href: '#packages' },
  { label: 'Location', href: '#location' },
];

interface NavbarProps {
  showLogo: boolean;
}

export function Navbar({ showLogo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 gutter-x border-b transition-[background-color,border-color,backdrop-filter] duration-200"
      style={{
        background: scrolled
          ? 'var(--bg-nav-scrolled)'
          : 'linear-gradient(to bottom, var(--bg-nav-top), var(--bg-nav-fade))',
        borderBottomColor: scrolled ? 'var(--border-whisper)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <a
        href="#top"
        aria-label="Jesu Fitness Home"
        className="inline-flex min-h-[28px] min-w-[140px] items-center"
      >
        {showLogo && (
          <motion.div
            layoutId="jesu-brand-logo"
            transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
            className="inline-flex items-center gap-2.5 text-xl font-bold tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
          >
            <span
              className="inline-block h-5 w-2.5 -skew-x-12"
              style={{ backgroundColor: 'var(--accent)' }}
              aria-hidden="true"
            />
            <span>Jesu Fitness</span>
          </motion.div>
        )}
      </a>

      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[0.9375rem] font-medium transition-colors duration-150 hover:text-[var(--ink-primary)]"
                style={{ color: 'var(--ink-secondary)' }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a href="#enquiry" className="btn-primary text-sm">
        Free trial
      </a>
    </header>
  );
}
