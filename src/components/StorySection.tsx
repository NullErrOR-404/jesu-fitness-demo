import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import { PHOTO_ASSETS } from '../data/gymData';

const MANIFESTO_LINES = [
  { text: 'Strength was never built in a sauna.', accent: false },
  { text: 'It is forged under a loaded barbell, one honest rep after another.', accent: false },
  {
    text: 'We stripped away everything you do not need, so nothing stands between you and the work.',
    accent: true,
  },
];

function IlluminatedLine({
  text,
  accent,
  progress,
  range,
}: {
  text: string;
  accent: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const prefersReduced = useReducedMotion();
  const opacity = useTransform(progress, range, [prefersReduced ? 1 : 0.25, 1]);
  const y = useTransform(progress, range, [prefersReduced ? 0 : 16, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        color: accent ? 'var(--accent)' : 'var(--ink-primary)',
      }}
      className="mb-4 block"
    >
      {text}
    </motion.span>
  );
}

export function StorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'center 42%'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [prefersReduced ? 0 : 28, prefersReduced ? 0 : -14]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="melt-void w-full py-[clamp(4.5rem,9vw,8.5rem)] gutter-x"
    >
      <div className="grid grid-cols-1 items-center gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <h2
            className="text-[clamp(1.85rem,3.3vw,3.1rem)] font-semibold leading-[1.18] tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {MANIFESTO_LINES.map((line, i) => {
              const start = i * 0.26;
              const end = Math.min(start + 0.42, 1);
              return (
                <IlluminatedLine
                  key={line.text}
                  text={line.text}
                  accent={line.accent}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </h2>

          <p
            className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed"
            style={{ color: 'var(--ink-secondary)' }}
          >
            Jesu Fitness started with a simple conviction: you do not need marble locker rooms to build a stronger body. You need heavy dumbbells, solid benches, reliable cables, a clean floor, and people who respect the effort.
          </p>
        </div>

        <motion.figure
          style={{ y: photoY, borderColor: 'var(--border-whisper)', backgroundColor: 'var(--bg-elevated)' }}
          className="aspect-[4/5] overflow-clip rounded-[var(--radius-md)] border"
        >
          <img
            src={PHOTO_ASSETS.story}
            alt="Focused athlete training with heavy dumbbells in low-key gym lighting"
            loading="lazy"
            className="h-full w-full object-cover contrast-[1.06] saturate-[0.88]"
          />
        </motion.figure>
      </div>
    </section>
  );
}
