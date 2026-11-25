import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { HERO_FACTS, PHOTO_ASSETS } from '../data/gymData';

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '-10%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 1.07]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '8%']);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-clip pt-28 pb-[clamp(2.5rem,6vh,5rem)] gutter-x"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-clip">
        <motion.img
          src={PHOTO_ASSETS.hero}
          alt="Lifter gripping heavy dumbbells inside a dark iron gym"
          fetchPriority="high"
          style={{ y: mediaY, scale: mediaScale }}
          className="h-[114%] w-full object-cover object-[center_28%] brightness-[0.74] contrast-[1.08] saturate-[0.85]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to top, var(--bg-void) 0%, var(--scrim-mid) 44%, var(--scrim-light) 100%), linear-gradient(to right, var(--scrim-side) 0%, var(--scrim-light) 68%)',
        }}
      />

      <motion.div
        style={{ y: contentY }}
        className="relative z-[2] grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)]"
      >
        <div>
          <h1
            className="text-[clamp(3rem,7.2vw,6.25rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            style={{ color: 'var(--ink-primary)' }}
          >
            Just iron.
            <br />
            Zero excuses.
          </h1>
          <p
            className="mt-5 max-w-[46ch] text-[clamp(1.05rem,1.35vw,1.25rem)] leading-relaxed"
            style={{ color: 'var(--ink-secondary)' }}
          >
            No spas or gimmicks. Jesu Fitness is built for lifters who load the bar and do the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#enquiry" className="btn-primary">
              Book free trial
            </a>
            <a href="#packages" className="btn-secondary">
              View packages
            </a>
          </div>
        </div>

        <dl
          className="grid grid-cols-2 gap-5 border-t pt-6"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          {HERO_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm" style={{ color: 'var(--ink-secondary)' }}>
                {fact.label}
              </dt>
              <dd
                className="mt-1 text-lg font-semibold tabular-nums"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
