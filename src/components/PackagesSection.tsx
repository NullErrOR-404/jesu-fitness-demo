import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PACKAGES, type PlanTier } from '../data/gymData';

interface PackagesSectionProps {
  withPT: boolean;
  onTogglePT: (value: boolean) => void;
  onSelectPlan: (tier: PlanTier, withPT: boolean) => void;
}

export function PackagesSection({ withPT, onTogglePT, onSelectPlan }: PackagesSectionProps) {
  return (
    <section
      id="packages"
      className="melt-surface w-full py-[clamp(5rem,9vw,8.5rem)] gutter-x"
      style={{ color: 'var(--ink-primary)' }}
    >
      <div className="mb-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <h2 className="text-[clamp(2.15rem,4.3vw,3.85rem)] font-bold leading-[1.04] tracking-[-0.035em]">
          Honest packages. Clear value.
        </h2>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <div
            role="group"
            aria-label="Training mode"
            className="inline-grid grid-cols-2 rounded-[var(--radius-sm)] border p-1"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            {[
              { label: 'Gym Access', value: false },
              { label: '+ Personal Training', value: true },
            ].map((tab) => {
              const active = withPT === tab.value;
              return (
                <button
                  key={tab.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onTogglePT(tab.value)}
                  className="relative min-h-[44px] cursor-pointer px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-150"
                  style={{ color: active ? 'var(--ink-on-accent)' : 'var(--ink-secondary)' }}
                >
                  {active && (
                    <motion.span
                      layoutId="pt-mode-indicator"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-[3px]"
                      style={{ backgroundColor: 'var(--accent)' }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[clamp(1.25rem,2vw,1.75rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)_minmax(0,0.95fr)]">
        {PACKAGES.map((pkg) => {
          const price = withPT ? pkg.ptPrice : pkg.basePrice;
          const rateText = withPT ? pkg.ratePt : pkg.rateBase;

          return (
            <article
              key={pkg.tier}
              className="flex flex-col justify-between gap-8 rounded-[var(--radius-md)] border p-[clamp(1.75rem,3vw,2.5rem)]"
              style={{
                borderColor: pkg.featured ? 'var(--accent)' : 'var(--border-whisper)',
                background: pkg.featured
                  ? 'linear-gradient(180deg, var(--bg-featured-top) 0%, var(--bg-elevated) 55%)'
                  : 'var(--bg-elevated)',
                color: 'var(--ink-primary)',
              }}
            >
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.025em]">{pkg.tier}</h3>
                <p className="mt-1.5 text-[0.9375rem]" style={{ color: 'var(--ink-secondary)' }}>
                  {pkg.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-2 tabular-nums">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={`${pkg.tier}-${price}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                      className="text-[clamp(2.35rem,3.5vw,3.25rem)] font-bold tracking-[-0.04em] tabular-nums"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
                    >
                      ₹{price.toLocaleString('en-IN')}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[0.95rem]" style={{ color: 'var(--ink-secondary)' }}>
                    {pkg.periodLabel}
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
                  {rateText}
                </p>

                <ul
                  className="mt-7 grid gap-3 border-t pt-6 text-[0.95rem]"
                  style={{ borderColor: 'var(--border-hairline)', color: 'var(--ink-secondary)' }}
                >
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0"
                        style={{ color: 'var(--accent)' }}
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan(pkg.tier, withPT)}
                className={pkg.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}
              >
                Choose {pkg.tier}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
