import { AnimatePresence, motion } from 'motion/react';

interface IntroCurtainProps {
  active: boolean;
}

export function IntroCurtain({ active }: IntroCurtainProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="intro-curtain"
          initial={{ y: '0%' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-clip"
          style={{ backgroundColor: 'var(--bg-void)' }}
          aria-hidden="true"
        >
          <motion.div
            layoutId="jesu-brand-logo"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="inline-flex items-center gap-3.5 text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.035em]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
          >
            <span
              className="inline-block h-[0.95em] w-[0.42em] -skew-x-12"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span>Jesu Fitness</span>
          </motion.div>

          {/* Subtle Forged Amber hairline sweep under the centered logo */}
          <div
            className="mt-6 h-[2px] w-28 overflow-clip rounded-full"
            style={{ backgroundColor: 'var(--border-whisper)' }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.58, ease: [0.32, 0.72, 0, 1] }}
              className="h-full w-full origin-left"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
